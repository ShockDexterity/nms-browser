import Express, { Router } from 'express'

import * as DB from '../mongodb/mongodb.js'
import { editedPlanet, newPlanet } from '../utils/planet_validators.js'

const database = DB.connect('NMSP')

const router = Router({
  caseSensitive: false,
  strict: false
})

router.use(Express.json({ type: 'application/json' }))

export default router

router.get('/', async (req, res) => {
  const dbPlanets = await DB.retrieveAllPlanets(database)

  if (dbPlanets.length === 0) {
    res.status(500).json({ error: 'No planets found' })
    return
  }

  res.status(200).json(dbPlanets)
})

router.put('/', async (req, res) => {
  newPlanet(req.body, async (err, validPlanet, messages) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
      return
    }

    const shouldNotExist = await DB.getPlanetByName(database, validPlanet.name)
    if (shouldNotExist) {
      res.status(400).json({ error: true, message: 'Planet already exists' })
      return
    }

    try {
      await DB.insertPlanet(database, validPlanet)
      res.status(200).json({
        success: true,
        message: `${validPlanet.name} added`,
        additional: messages
      })
    }
    catch (err) {
      res.status(500).json({ error: true, message: 'Unable to add planet' })
    }
  })
})

router.put('/edit', async (req, res) => {
  editedPlanet(req.body, async (err, validInfo, messages) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
      return
    }

    Object.keys(validInfo).forEach((key) => {
      if (validInfo[key] === null || validInfo[key] === undefined) {
        delete validInfo[key]
      }
    })

    const planetToEdit = await DB.getPlanetById(database, validInfo._id)
    if (!planetToEdit) {
      res.status(400).json({ error: true, message: 'Planet does not exist' })
      return
    }

    try {
      await DB.updatePlanet(database, planetToEdit._id, validInfo)
      res.status(200).json({
        success: true,
        message: `${planetToEdit.name} updated to ${validInfo.name}`,
        additional: messages
      })
    }
    catch (err) {
      res.status(500).json({ error: true, message: 'Unable to update planet' })
    }
  })
})

router.delete('/:id', async (req, res) => {
  const _id = req.params.id
  if (!_id) {
    res.status(400).json({ error: true, message: 'No ID provided' })
    return
  }

  const deletedPlanet = await DB.deletePlanetById(database, _id)
  if (!deletedPlanet) {
    res.status(400).json({ error: true, message: 'Unable to delete planet' })
    return
  }

  res.status(200).json({
    success: true,
    name: deletedPlanet.name,
    message: `"${deletedPlanet.name}" deleted`
  })
})
