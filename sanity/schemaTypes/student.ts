// /sanity/schemas/student.ts
export default {
  name: 'student',
  type: 'document',
  title: 'Students',
  fields: [
    {
      name: 'rollNumber',
      type: 'string',
      title: 'Roll Number',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'name',
      type: 'string',
      title: 'Full Name',
    },
    {
      name: 'password',
      type: 'string',
      title: 'Password',
    },
    {
      name: 'department',
      type: 'string',
      title: 'Department',
    },
  ],
};
