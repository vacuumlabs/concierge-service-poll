const {App} = require('@slack/bolt')
const {google} = require('googleapis')
const {poll_select, poll_thank_you} = require('./blocks.js')

let polls_in_progress = {}

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
  signingSecret: process.env.CONCIERGE_SIGNING_SECRET
})
app.start(process.env.PORT || 3000)
console.log('App is running!')

app.command('/concierge', async ({ack, payload, context}) => {
  ack()
  const sender_user_id = payload.user_id
  const send_status = async (message) => {
    const result = await app.client.chat.postMessage({
      token: context.botToken,
      channel: sender_user_id,
      text: message,
    })
    return result
  }

  if (!payload.text) {
    await send_status('Usage: /concierge @user_name')
    return
  }
  const user_id_match = payload.text.match(/^<@([^|]*)(\|.+)?>$/)
  if (!user_id_match) {
    await send_status(`${payload.text} doesn't look like a user name`)
    return
  }
  const target_user_id = user_id_match[1]
  try {
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: target_user_id,
      blocks: poll_select,
      text: 'How were you satisfied with the concierge services?',
    })
    const target_user = await app.client.users.info({
      token: context.botToken,
      user: target_user_id,
    })
    const result = await send_status(`Poll sent to ${target_user.user.real_name}.`)
    polls_in_progress[target_user_id] = {
      target_user_name: target_user.user.real_name,
      progress_msg_channel: result.channel,
      progress_msg_ts: result.message.ts,
    }
  } catch (error) {
    console.error(error)
  }
})

app.action('submit', async ({ack, body, context}) => {
  ack()
  const poll = polls_in_progress[body.user.id]
  put_response_in_table(poll.target_user_name, body.actions[0].selected_option.value)
  try {
    await app.client.chat.update({
      token: context.botToken,
      ts: body.message.ts,
      channel: body.channel.id,
      blocks: poll_thank_you,
      text: 'Thank you!',
    })
    await app.client.chat.update({
      token: context.botToken,
      ts: poll.progress_msg_ts,
      channel: poll.progress_msg_channel,
      text: `${poll.target_user_name} has completed the poll.`,
    })
  } catch (error) {
    console.error(error)
  }
})

function put_response_in_table(name, satisfaction) {
  const sheets = google.sheets({version: 'v4'})
  let resource = {
    values: [[name, satisfaction, new Date().toUTCString()]],
  }
  sheets.spreadsheets.values.append(
    {
      auth: jwt_client,
      spreadsheetId: '1Ip4fsMcLpvYVckzqA782rUaKazKAbIeGV_s5Jo0j8hQ',
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      resource,
    },
    (err, result) => {
      if (err) {
        console.log(err)
      }
    }
  )
}
