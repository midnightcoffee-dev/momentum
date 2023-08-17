export default {
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'order',
      type: 'number',
    },
    {
      name: 'course',
      type: 'reference',
      to: {type: 'course'},
    },
    {
      name: 'contents',
      type: 'array',
      of: [{type: 'reference', to: {type: 'content'}}],
    },
  ],
}
