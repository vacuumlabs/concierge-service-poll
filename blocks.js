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
        initial_value:
          'Hi! As we still want to improve our concierge services, please give us feedback and rate completing of your last request: ',
      },
      label: {
        type: 'plain_text',
        text: 'Message',
        emoji: true,
      },
    },
  ],
})

const poll_select = (message) => [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: message,
    },
    accessory: {
      type: 'static_select',
      placeholder: {
        type: 'plain_text',
        text: 'Select an item',
        emoji: true,
      },
      options: [
        {
          text: {
            type: 'plain_text',
            text: '1: I would rather do it myself next time',
            emoji: true,
          },
          value: '1',
        },
        {
          text: {
            type: 'plain_text',
            text: '2: I really hope for some progress next time',
            emoji: true,
          },
          value: '2',
        },
        {
          text: {
            type: 'plain_text',
            text: '3: Neither satisfied nor dissatisfied',
            emoji: true,
          },
          value: '3',
        },
        {
          text: {
            type: 'plain_text',
            text: '4: Everything went well except few small hesitations',
            emoji: true,
          },
          value: '4',
        },
        {
          text: {
            type: 'plain_text',
            text: '5: I cannot complain about anything',
            emoji: true,
          },
          value: '5',
        },
      ],
      action_id: 'submit',
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
  poll_select,
  poll_thank_you,
}
