// Content.js
export default {
  name: 'content',
  title: 'Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'lesson',
      type: 'reference',
      to: {type: 'lesson'},
    },
    {
      name: 'content',
      title: 'Content',
      type: 'contentModule',
    },
  ],
}
