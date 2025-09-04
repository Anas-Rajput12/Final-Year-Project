export default {
  name: 'library',
  title: 'Library Info',
  type: 'document',
  fields: [
    { name: 'hours', type: 'string', title: 'Library Hours' },
    {
      name: 'availableBooks',
      type: 'array',
      title: 'Available Books',
      of: [{ type: 'string' }]
    }
  ]
}

