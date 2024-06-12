import Express from 'express'

import planetRouter from './api/planet_api.js'
import systemRouter from './api/system_api.js'
import baseRouter from './api/base_api.js'
import multitoolRouter from './api/multitool_api.js'

const app = Express()

app.use('/', (req, res, next) => {
  console.log(`${req.method} request from path ${req.path}`)
  next()
})

app.use('/planets', planetRouter)
app.use('/systems', systemRouter)
app.use('/bases', baseRouter)
app.use('/multitools', multitoolRouter)

app.use(Express.static('public'))

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
