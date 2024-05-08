// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import { reviewsClient } from './services/reviews/reviews.shared.js'

import { bookingsClient } from './services/bookings/bookings.shared.js'

import { toursClient } from './services/tours/tours.shared.js'

import { userClient } from './services/users/users.shared.js'

/**
 * Returns a  client for the backend app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)

  client.configure(toursClient)

  client.configure(bookingsClient)

  client.configure(reviewsClient)

  return client
}
