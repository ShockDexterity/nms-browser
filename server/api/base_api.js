import Express, { Router } from 'express'

import { validateBase } from '../utils/base_validators.js'

import * as DB from '../mongodb/mongodb.js'

const database = DB.connect('NMSP')
const bases = database.collection('bases')

const router = Router({
  caseSensitive: false,
  strict: false
})

router.use(Express.json({ type: 'application/json' }))

export default router

router.get('/', async (req, res) => {
  const dbBases = await DB.retrieveAllFromCollection(bases)
  res.status(200).json(dbBases)
})

router.put('/', async (req, res) => {
  validateBase(req.body, false, async (err, validBase) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
      return
    }

    try {
      await DB.insertBase(database, validBase)
      res.status(200).json({
        success: true,
        message: `${validBase.name} added`
      })
    }
    catch (err) {
      res.status(500).json({ error: true, message: 'Unable to add base' })
    }
  })
})

router.put('/edit', async (req, res) => {
  validateBase(req.body, true, async (err, validInfo) => {
    if (err) {
      res.status(err.status).json({ error: true, message: err.message })
      return
    }

    Object.keys(validInfo).forEach((key) => {
      if (validInfo[key] === null || validInfo[key] === undefined) {
        delete validInfo[key]
      }
    })

    const baseToEdit = await DB.getFromCollectionById(bases, validInfo._id)

    if (!baseToEdit) {
      res.status(400).json({ error: true, message: 'Base does not exist' })
      return
    }

    try {
      await DB.updateBase(database, baseToEdit._id, validInfo)
      res.status(200).json({
        success: true,
        message: `${baseToEdit.name} updated to ${validInfo.name}`
      })
    }
    catch (err) {
      res.status(500).json({ error: true, message: 'Unable to update base' })
    }
  })
})

router.delete('/:id', async (req, res) => {
  const _id = req.params.id
  if (!_id) {
    res.status(400).json({ error: true, message: 'No ID provided' })
    return
  }

  const deletedBase = await DB.deleteFromCollectionById(bases, _id)

  if (!deletedBase) {
    res.status(400).json({ error: true, message: 'Unable to delete base' })
    return
  }

  res.status(200).json({
    success: true,
    name: deletedBase.name,
    message: `"${deletedBase.name}" deleted`
  })
})
