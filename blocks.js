const message_modal = (user_id) => ({
  type: 'modal',
  callback_id: 'message_modal',
  title: {
    type: 'plain_text',
    text: 'Concierge service poll',
    emoji: true,
  },
  submit: {
    type: 'plain_text',
    text: 'Submit',
    emoji: true,
  },
  close: {
    type: 'plain_text',
    text: 'Cancel',
    emoji: true,
  },
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'To:',
      },
      accessory: {
        type: 'users_select',
        action_id: 'select_user',
        placeholder: {
          type: 'plain_text',
          text: 'select a user',
        },
        initial_user: user_id,
      },
    },
    {
      type: 'input',
      block_id: 'message',
      element: {
        type: 'plain_text_input',
        action_id: 'text',
        multiline: true,
        placeholder: {
          type: 'plain_text',
          text: intro_text,
        },
      },
      label: {
        type: 'plain_text',
        text: 'Message',
        emoji: true,
      },
    },
  ],
})
const intro_text =
  'Hi! As we still want to improve our concierge services, please give us feedback and rate completing of your last request: '

const poll_select = (message) => [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: message,
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'I would rather do it myself next time',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: '1',
      },
      value: '1',
      action_id: 'submit_1',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'I really hope for some progress next time',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: '2',
      },
      value: '2',
      action_id: 'submit_2',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Neither satisfied nor dissatisfied',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: '3',
      },
      value: '3',
      action_id: 'submit_3',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Everything went well except few small hesitations',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: '4',
      },
      value: '4',
      action_id: 'submit_4',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Great work, I cannot complain about anything',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: '5',
      },
      value: '5',
      action_id: 'submit_5',
    },
  },
]

const poll_thank_you = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Thank you for your time!',
    },
  },
]

module.exports = {
  message_modal,
  intro_text,
  poll_select,
  poll_thank_you,
}
