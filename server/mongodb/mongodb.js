import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

import dotenv from 'dotenv'

// Reads .env file into process.env
dotenv.config()

const DB_USER = process.env.DB_USER ?? 'bad_user'
const DB_PASS = process.env.DB_PASS ?? 'bad_password'
const DB_SERVER = process.env.DB_SERVER ?? 'unknown'

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_SERVER}/?retryWrites=true&w=majority&appName=shockdexterityCluster`

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

export async function retrieveAllPlanets (database) {
  const query = {}
  const projection = {}
  const sort = { system: 1, name: 1 }

  return await database
    .collection('planets')
    .find(query)
    .project(projection)
    .sort(sort)
    .toArray()
}

export async function getPlanetByName (database, name) {
  return await database.collection('planets').findOne({ name })
}

export async function getPlanetById (database, _id) {
  return await database.collection('planets').findOne(new ObjectId(_id))
}

export async function insertPlanet (database, planet) {
  return await database.collection('planets').insertOne(planet)
}

export async function updatePlanet (database, _id, replacementData) {
  const query = { _id: new ObjectId(_id) }

  const dataWithoutId = { ...replacementData }
  delete dataWithoutId._id

  const replacer = { $set: dataWithoutId }

  const response = await database
    .collection('planets')
    .updateOne(query, replacer)
  return response
}

export async function deletePlanetById (database, _id) {
  return await database
    .collection('planets')
    .findOneAndDelete({ _id: new ObjectId(_id) })
}
