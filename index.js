const {App} = require('@slack/bolt')
const {google} = require('googleapis')
const {message_modal, intro_text, poll_select, poll_thank_you} = require('./blocks.js')

const jwt_client = new google.auth.JWT(
  'concierge@concierge-1580124434121.iam.gserviceaccount.com',
  null,
  process.env.CONCIERGE_GOOGLE_PRIVATE_KEY,
  ['https://www.googleapis.com/auth/spreadsheets']
)
jwt_client.authorize(function(error, tokens) {
  if (error) {
    console.log(error)
  } else {
    console.log('Successfully connected to google!')
  }
})

const app = new App({
  token: process.env.CONCIERGE_BOT_TOKEN,
  signingSecret: process.env.CONCIERGE_SIGNING_SECRET,
})
app.start(process.env.PORT || 3000)
console.log('App is running!')

let polls_in_progress = {}
let target_user_id = undefined

app.command('/concierge', async ({ack, payload, context}) => {
  ack()
  const sender_user_id = payload.user_id

  if (payload.text) {
    const user_id_match = payload.text.match(/^<@([^|]*)(\|.+)?>$/)
    if (!user_id_match) {
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: sender_user_id,
        text: `${payload.text} doesn't look like a user name`,
      })
      return
    }
    target_user_id = user_id_match[1]
  }

  await app.client.views.open({
    token: context.botToken,
    trigger_id: payload.trigger_id,
    view: message_modal(target_user_id),
  })
})

app.action('select_user', async ({ack, body}) => {
  ack()
  target_user_id = body.actions[0].selected_user
})

app.view('message_modal', async ({ack, body, view, context}) => {
  ack()
  const task_desciption = view.state.values.message.text.value
  await app.client.chat.postMessage({
    token: context.botToken,
    channel: target_user_id,
    blocks: poll_select(intro_text + task_desciption),
    text: 'How were you satisfied with the concierge services?',
  })
  const target_user = await app.client.users.info({
    token: context.botToken,
    user: target_user_id,
  })
  const result = await app.client.chat.postMessage({
    token: context.botToken,
    channel: body.user.id,
    text: `Poll sent to ${target_user.user.real_name}.`,
  })
  polls_in_progress[target_user_id] = {
    target_user_name: target_user.user.real_name,
    progress_msg_channel: result.channel,
    progress_msg_ts: result.message.ts,
    task_desciption,
  }
})

const handle_submit = async ({ack, body, context}) => {
  ack()
  const poll = polls_in_progress[body.user.id]
  put_response_in_table(poll.target_user_name, body.actions[0].value, poll.task_desciption)
  await app.client.chat.update({
    token: context.botToken,
    ts: body.message.ts,
    channel: body.channel.id,
    blocks: poll_thank_you,
    text: 'Thank you for your time!',
  })
  await app.client.chat.update({
    token: context.botToken,
    ts: poll.progress_msg_ts,
    channel: poll.progress_msg_channel,
    text: `${poll.target_user_name} has completed the poll.`,
  })
}

for (let i = 1; i <= 5; ++i) app.action(`submit_${i}`, handle_submit)

function put_response_in_table(name, satisfaction, task_desciption) {
  const sheets = google.sheets({version: 'v4'})
  let resource = {
    values: [[name, satisfaction, task_desciption, new Date().toUTCString()]],
  }
  sheets.spreadsheets.values.append(
    {
      auth: jwt_client,
      spreadsheetId: '1Ip4fsMcLpvYVckzqA782rUaKazKAbIeGV_s5Jo0j8hQ',
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      resource,
    },
    (err, result) => {
      if (err) {
        console.log(err)
      }
    }
  )
}
