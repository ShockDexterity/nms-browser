import Express, { Router } from 'express'

import * as DB from '../mongodb/mongodb.js'
import { validateSystem } from '../utils/system_validators.js'

const database = DB.connect('NMSP')
const systems = database.collection('systems')

const router = Router({
  caseSensitive: false,
  strict: false
})

router.use(Express.json({ type: 'application/json' }))

export default router

router.get('/', async (req, res) => {
  const dbSystems = await DB.retrieveAllFromCollection(systems)
  res.status(200).json(dbSystems)
})

router.put('/', async (req, res) => {
  validateSystem(req.body, false, async (err, validSystem) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
      return
    }

    const shouldNotExist = await DB.getFromCollectionByName(
      systems,
      validSystem.name
    )

    if (shouldNotExist) {
      res.status(400).json({ error: true, message: 'System already exists' })
      return
    }

    try {
      await DB.insertSystem(database, validSystem)
      res.status(200).json({
        success: true,
        message: `${validSystem.name} added`
      })
    }
    catch (err) {
      res.status(500).json({ error: true, message: 'Unable to add system' })
    }
  })
})

router.put('/edit', async (req, res) => {
  validateSystem(req.body, true, async (err, validInfo) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
      return
    }

    Object.keys(validInfo).forEach((key) => {
      if (validInfo[key] === null || validInfo[key] === undefined) {
        delete validInfo[key]
      }
    })

    const systemToEdit = await DB.getFromCollectionById(systems, validInfo._id)

    if (!systemToEdit) {
      res.status(400).json({ error: true, message: 'System does not exist' })
      return
    }

    try {
      await DB.updateSystem(database, systemToEdit._id, validInfo)
      res.status(200).json({
        success: true,
        message: `${systemToEdit.name} updated to ${validInfo.name}`
      })
    }
    catch (err) {
      res.status(500).json({ error: true, message: 'Unable to update system' })
    }
  })
})

router.delete('/:id', async (req, res) => {
  const _id = req.params.id
  if (!_id) {
    res.status(400).json({ error: true, message: 'No ID provided' })
    return
  }

  const deletedSystem = await DB.deleteFromCollectionById(systems, _id)

  if (!deletedSystem) {
    res.status(400).json({ error: true, message: 'Unable to delete system' })
    return
  }

  res.status(200).json({
    success: true,
    name: deletedSystem.name,
    message: `"${deletedSystem.name}" deleted`
  })
})
