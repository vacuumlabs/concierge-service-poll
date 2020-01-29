const poll_select = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'How were you satisfied with the concierge services?',
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
            text: '1 - I would rather do it myself next time',
            emoji: true,
          },
          value: '1',
        },
        {
          text: {
            type: 'plain_text',
            text: '2',
            emoji: true,
          },
          value: '2',
        },
        {
          text: {
            type: 'plain_text',
            text: '3',
            emoji: true,
          },
          value: '3',
        },
        {
          text: {
            type: 'plain_text',
            text: '4',
            emoji: true,
          },
          value: '4',
        },
        {
          text: {
            type: 'plain_text',
            text: '5 - I cannot complain about anything',
            emoji: true,
          },
          value: '5',
        },
      ],
      action_id: 'submit_poll',
    },
  },
]

const poll_thank_you = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Thank you!',
    },
  },
]

exports.poll_select = poll_select
