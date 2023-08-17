export default {
  name: 'course',
  title: 'Course',
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
      name: 'preview',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'cover',
      type: 'image',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'stars',
      type: 'number',
    },
    {
      name: 'isOpen',
      type: 'boolean',
    },
    {
      name: 'publishedAt',
      type: 'datetime',
    },
    {
      name: 'updatedAt',
      type: 'datetime',
    },
    {
      name: 'technologies',
      type: 'array',
      of: [{type: 'reference', to: {type: 'technology'}}],
    },
    {
      name: 'lessons',
      type: 'array',
      of: [{type: 'reference', to: {type: 'lesson'}}],
    },
  ],
}
