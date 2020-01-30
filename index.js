const express = require('express')
const bodyParser = require('body-parser')
const {WebClient} = require('@slack/web-api')
const logger_1 = require('@slack/web-api/dist/logger')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
client = new WebClient(process.env.CONCIERGE_BOT_TOKEN, {
  logLevel: logger_1.LogLevel.DEBUG,
})
app.post('/', async (req, res) => {
  res.status(200).send()
  const r = await client.chat.postMessage({
    channel: req.body.user_id,
    text: 'ahoj',
  })
})
app.listen(8000)
console.log('app started')
