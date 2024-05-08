export const userPath = 'users'

export const userMethods = ['find', 'get', 'create', 'update', 'patch', 'remove']

export const userClient = (client) => {
  const connection = client.get('connection')

  client.use(userPath, connection.service(userPath), {
    methods: userMethods
  })
}
