import { MongoDBService } from '@feathersjs/mongodb'
import { app } from "../../app.js"
import {userSchema} from "./users.schema.js"
// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UserService extends MongoDBService {
  
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('users'))
  }
}
