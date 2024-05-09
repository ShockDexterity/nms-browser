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

export async function retrieveAllPlanets (collection) {
  const query = {}
  const projection = {}
  const sort = { system: 1, name: 1 }

  return await collection.find(query).project(projection).sort(sort).toArray()
}

export async function getPlanetByName (collection, name) {
  const query = { name }
  const projection = {}

  const data = await collection.findOne(query, projection)

  return data
}

export async function getPlanetByID (collection, _id) {
  const query = { _id: new ObjectId(_id) }
  const projection = {}

  const data = await collection.findOne(query, projection)

  return data
}

export async function insertPlanet (collection, planet) {
  return await collection.insertOne(planet)
}

export async function updatePlanet (collection, _id, replacementData) {
  const query = { _id: new ObjectId(_id) }

  const dataWithoutId = { ...replacementData }
  delete dataWithoutId._id

  const replacer = { $set: dataWithoutId }

  const response = await collection.updateOne(query, replacer)
  return response
}

export async function deletePlanet (collection, _id) {
  const query = { _id: new ObjectId(_id) }

  const data = await collection.findOneAndDelete(query)

  return data
}
