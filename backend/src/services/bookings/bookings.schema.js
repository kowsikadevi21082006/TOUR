// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const bookingsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    userId:Type.String(),
    tourId: Type.String(),
    fullName: Type.String(),
    phoneNumber: Type.String(),
    tourDate: Type.String(),
    bookingDate: Type.String(),
    numOfGuests: Type.String(),
    pricePerPerson: Type.String(),
    serviceCharge: Type.String(),
    totalPaid: Type.String()
  },
  { $id: 'Bookings', additionalProperties: false }
)
export const bookingsValidator = getValidator(bookingsSchema, dataValidator)
export const bookingsResolver = resolve({})

export const bookingsExternalResolver = resolve({})






// Schema for creating new entries
export const bookingsDataSchema = Type.Pick(bookingsSchema, [
  'userId', 'tourId', 'fullName', 'phoneNumber', 'tourDate', 'bookingDate', 'numOfGuests', 'pricePerPerson', 'serviceCharge', 'totalPaid'
], {
  $id: 'BookingsData'
})
export const bookingsDataValidator = getValidator(bookingsDataSchema, dataValidator)
export const bookingsDataResolver = resolve({})






// Schema for updating existing entries
export const bookingsPatchSchema = Type.Partial(bookingsSchema, {
  $id: 'BookingsPatch'
})
export const bookingsPatchValidator = getValidator(bookingsPatchSchema, dataValidator)
export const bookingsPatchResolver = resolve({})






// Schema for allowed query properties
export const bookingsQueryProperties = Type.Pick(bookingsSchema, ['_id', 'userId'])
export const bookingsQuerySchema = Type.Intersect(
  [
    querySyntax(bookingsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const bookingsQueryValidator = getValidator(bookingsQuerySchema, queryValidator)
export const bookingsQueryResolver = resolve({})
