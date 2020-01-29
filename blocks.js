const poll_select = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Hi! As we still want to improve our concierge services, please give us feedback and rate completing of your last request.',
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
  poll_select,
  poll_thank_you,
}
