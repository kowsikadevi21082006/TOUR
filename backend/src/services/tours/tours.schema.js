// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const toursSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    "id": Type.Number(),
    "title": Type.String(),
    "city": Type.String(),
    "address": Type.String(),
    "distance": Type.Number(),
    "price": Type.Number(),
    "maxGroupSize": Type.Number(),
    "desc": Type.String(),
    "photo": Type.String(),
    "featured": Type.Boolean()
  },
  { $id: 'Tours', additionalProperties: false }
)
export const toursValidator = getValidator(toursSchema, dataValidator)
export const toursResolver = resolve({})

export const toursExternalResolver = resolve({})





// Schema for creating new entries
export const toursDataSchema = Type.Pick(toursSchema, [
  'id', 'title', 'city', 'address', 'distance', 'price', 'maxGroupSize', 'desc', 'photo', 'featured'
], {
  $id: 'ToursData'
})
export const toursDataValidator = getValidator(toursDataSchema, dataValidator)
export const toursDataResolver = resolve({})






// Schema for updating existing entries
export const toursPatchSchema = Type.Partial(toursSchema, {
  $id: 'ToursPatch'
})
export const toursPatchValidator = getValidator(toursPatchSchema, dataValidator)
export const toursPatchResolver = resolve({})






// Schema for allowed query properties
export const toursQueryProperties = Type.Pick(toursSchema, [
  '_id', 'id', 'title', 'city', 'address', 'distance', 'maxGroupSize', 'featured', 'location'
])
export const toursQuerySchema = Type.Intersect(
  [
    querySyntax(toursQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const toursQueryValidator = getValidator(toursQuerySchema, queryValidator)
export const toursQueryResolver = resolve({})
