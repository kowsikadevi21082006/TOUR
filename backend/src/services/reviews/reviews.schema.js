// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const reviewsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    tourId: Type.String(),
    userId: Type.String(),
    userName: Type.String(),
    createdDate: Type.Number(),
    reviewText: Type.String(),
    reviewRating: Type.Number()
  },
  { $id: 'Reviews', additionalProperties: false }
)
export const reviewsValidator = getValidator(reviewsSchema, dataValidator)
export const reviewsResolver = resolve({})

export const reviewsExternalResolver = resolve({})




// Schema for creating new entries
export const reviewsDataSchema = Type.Pick(
  reviewsSchema,
  ['tourId', 'userId', 'userName', 'createdDate', 'reviewText', 'reviewRating'],
  {
    $id: 'ReviewsData'
  }
)
export const reviewsDataValidator = getValidator(reviewsDataSchema, dataValidator)
export const reviewsDataResolver = resolve({})




// Schema for updating existing entries
export const reviewsPatchSchema = Type.Partial(reviewsSchema, {
  $id: 'ReviewsPatch'
})
export const reviewsPatchValidator = getValidator(reviewsPatchSchema, dataValidator)
export const reviewsPatchResolver = resolve({})




// Schema for allowed query properties
export const reviewsQueryProperties = Type.Pick(reviewsSchema, ['_id', 'tourId', 'createdDate'])
export const reviewsQuerySchema = Type.Intersect(
  [
    querySyntax(reviewsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const reviewsQueryValidator = getValidator(reviewsQuerySchema, queryValidator)
export const reviewsQueryResolver = resolve({})
