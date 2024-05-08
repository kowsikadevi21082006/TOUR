export const bookingsPath = 'bookings'

export const bookingsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const bookingsClient = (client) => {
  const connection = client.get('connection')

  client.use(bookingsPath, connection.service(bookingsPath), {
    methods: bookingsMethods
  })
}
