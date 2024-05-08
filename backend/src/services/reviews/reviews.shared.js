export const reviewsPath = 'reviews'

export const reviewsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const reviewsClient = (client) => {
  const connection = client.get('connection')

  client.use(reviewsPath, connection.service(reviewsPath), {
    methods: reviewsMethods
  })
}
