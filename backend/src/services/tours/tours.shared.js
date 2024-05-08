export const toursPath = 'tours'

export const toursMethods = ['find', 'get', 'create', 'patch', 'remove']

export const toursClient = (client) => {
  const connection = client.get('connection')

  client.use(toursPath, connection.service(toursPath), {
    methods: toursMethods
  })
}
