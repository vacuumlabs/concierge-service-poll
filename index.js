const {App} = require('@slack/bolt')
const logger_1 = require('@slack/logger')

const app = new App({
  token: process.env.CONCIERGE_BOT_TOKEN,
  signingSecret: process.env.CONCIERGE_SIGNING_SECRET,
  endpoints: {
    events: '/',
    commands: '/',
  },
  logLevel: logger_1.LogLevel.DEBUG,
})

app.command('/concierge', async ({ack, payload, context}) => {
  ack()
  await app.client.chat.postMessage({
    token: context.botToken,
    channel: payload.user_id,
    text: 'How were you satisfied with the cossncierge services?',
  })
})

app.start(3000)
console.log('Bolt app is running!')
