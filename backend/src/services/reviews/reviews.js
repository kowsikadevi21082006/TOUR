// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import { authenticate } from '@feathersjs/authentication'
import {
  reviewsDataValidator,
  reviewsPatchValidator,
  reviewsQueryValidator,
  reviewsResolver,
  reviewsExternalResolver,
  reviewsDataResolver,
  reviewsPatchResolver,
  reviewsQueryResolver
} from './reviews.schema.js'
import { ReviewsService, getOptions } from './reviews.class.js'
import { reviewsPath, reviewsMethods } from './reviews.shared.js'

export * from './reviews.class.js'
export * from './reviews.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const reviews = (app) => {
  // Register our service on the Feathers application
  app.use(reviewsPath, new ReviewsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: reviewsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(reviewsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(reviewsExternalResolver), schemaHooks.resolveResult(reviewsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(reviewsQueryValidator), schemaHooks.resolveQuery(reviewsQueryResolver)],
      find: [],
      get: [],
      create: [authenticate('jwt'), schemaHooks.validateData(reviewsDataValidator), schemaHooks.resolveData(reviewsDataResolver)],
      patch: [authenticate('jwt'), schemaHooks.validateData(reviewsPatchValidator), schemaHooks.resolveData(reviewsPatchResolver)],
      remove: [authenticate('jwt')]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
