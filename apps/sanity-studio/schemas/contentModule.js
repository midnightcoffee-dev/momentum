export default {
  name: 'contentModule',
  title: 'Content Module',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['video', 'markdown', 'downloadable', 'quiz'],
      },
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'markdown',
      title: 'Markdown',
      type: 'text',
    },
    {
      name: 'downloadable',
      title: 'Downloadable',
      type: 'file',
    },
    {
      name: 'quiz',
      title: 'Quiz',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              type: 'string',
            },
            {
              name: 'options',
              type: 'array',
              of: [{type: 'string'}],
            },
            {
              name: 'answer',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
