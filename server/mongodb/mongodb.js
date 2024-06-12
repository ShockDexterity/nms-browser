import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

import dotenv from 'dotenv'

// Reads .env file into process.env
dotenv.config()

const DB_USER = process.env.DB_USER ?? 'bad_user'
const DB_PASS = process.env.DB_PASS ?? 'bad_password'
const DB_SERVER = process.env.DB_SERVER ?? 'unknown'
const DB_APP_NAME = process.env.DB_APP_NAME ?? 'unknown'

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_SERVER}/?retryWrites=true&w=majority&appName=${DB_APP_NAME}`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export function connect (dbName) {
  try {
    return client.db(dbName)
  }
  catch (err) {
    console.error(err)
    return null
  }
}

export async function retrieveAllFromCollection (collection, sortBy) {
  return await collection.find().sort(sortBy).toArray()
}

// export async function retrieveAllPlanets (database) {
//   const sort = { system: 1, name: 1 }
//   return await database.collection('planets').find().sort(sort).toArray()
// }

// export async function retrieveAllSystems (database) {
//   const sort = { name: 1 }
//   return await database.collection('systems').find().sort(sort).toArray()
// }

export async function getFromCollectionById (collection, _id) {
  return await collection.findOne(new ObjectId(_id))
}

// export async function getPlanetById (database, _id) {
//   return await database.collection('planets').findOne(new ObjectId(_id))
// }

// export async function getSystemById (database, _id) {
//   return await database.collection('systems').findOne(new ObjectId(_id))
// }

export async function getFromCollectionByName (collection, name) {
  return await collection.findOne({ name })
}

// export async function getPlanetByName (database, name) {
//   return await database.collection('planets').findOne({ name })
// }

// export async function getSystemByName (database, name) {
//   return await database.collection('systems').findOne({ name })
// }

export async function insertPlanet (database, planet) {
  return await database.collection('planets').insertOne(planet)
}

export async function insertSystem (database, system) {
  return await database.collection('systems').insertOne(system)
}

export async function insertBase (database, base) {
  return await database.collection('bases').insertOne(base)
}

export async function insertMultitool (database, multitool) {
  return await database.collection('multitools').insertOne(multitool)
}

export async function updateItemInCollection (collection, _id, updatedData) {
  const query = { _id: new ObjectId(_id) }

  const dataWithoutId = { ...updatedData }
  delete dataWithoutId._id

  const replacer = { $set: dataWithoutId }

  return await collection.updateOne(query, replacer)
}

/*
export async function updatePlanet (database, _id, replacementData) {
  const query = { _id: new ObjectId(_id) }

  const dataWithoutId = { ...replacementData }
  delete dataWithoutId._id

  const replacer = { $set: dataWithoutId }

  return await database.collection('planets').updateOne(query, replacer)
}

export async function updateSystem (database, _id, replacementData) {
  const query = { _id: new ObjectId(_id) }

  const dataWithoutId = { ...replacementData }
  delete dataWithoutId._id

  const replacer = { $set: dataWithoutId }

  return await database.collection('systems').updateOne(query, replacer)
}

export async function updateBase (database, _id, replacementData) {
  const query = { _id: new ObjectId(_id) }

  const dataWithoutId = { ...replacementData }
  delete dataWithoutId._id

  const replacer = { $set: dataWithoutId }

  return await database.collection('bases').updateOne(query, replacer)
}

export async function updateMultitool (database, _id, replacementData) {
  const query = { _id: new ObjectId(_id) }

  const dataWithoutId = { ...replacementData }
  delete dataWithoutId._id

  const replacer = { $set: dataWithoutId }

  return await database.collection('multitools').updateOne(query, replacer)
}
*/

export async function deleteFromCollectionById (collection, _id) {
  return await collection.findOneAndDelete({ _id: new ObjectId(_id) })
}

export async function deletePlanetById (database, _id) {
  return await database
    .collection('planets')
    .findOneAndDelete({ _id: new ObjectId(_id) })
}

export async function deleteSystemById (database, _id) {
  return await database
    .collection('systems')
    .findOneAndDelete({ _id: new ObjectId(_id) })
}
