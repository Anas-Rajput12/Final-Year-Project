import { type SchemaTypeDefinition } from 'sanity'
import exam from './exam'
import library from './library'
import event from './event'
import timetable from './timetable'
import student from './student'
import contact from './contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [exam, event, library, timetable, student, contact],
}
