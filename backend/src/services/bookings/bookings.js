// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  bookingsDataValidator,
  bookingsPatchValidator,
  bookingsQueryValidator,
  bookingsResolver,
  bookingsExternalResolver,
  bookingsDataResolver,
  bookingsPatchResolver,
  bookingsQueryResolver
} from './bookings.schema.js'
import { BookingsService, getOptions } from './bookings.class.js'
import { bookingsPath, bookingsMethods } from './bookings.shared.js'

export * from './bookings.class.js'
export * from './bookings.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const bookings = (app) => {
  // Register our service on the Feathers application
  app.use(bookingsPath, new BookingsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bookingsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bookingsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(bookingsExternalResolver),
        schemaHooks.resolveResult(bookingsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(bookingsQueryValidator),
        schemaHooks.resolveQuery(bookingsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(bookingsDataValidator),
        schemaHooks.resolveData(bookingsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(bookingsPatchValidator),
        schemaHooks.resolveData(bookingsPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
