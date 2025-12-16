#!/usr/bin/env node
// This is used for 

import http from 'http'
import { Server, Socket } from 'socket.io'

import { YSocketIO } from './y-socket-io'

const host = process.env.HOST ?? 'localhost'
const port = parseInt(`${process.env.PORT ?? 1234}`)


const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ ok: true }))
})
const io = new Server(server)

const ysocketio = new YSocketIO({})

// Execute initialize method
ysocketio.initialize(io)

// Handling another socket namespace
io.on('connection', (socket: Socket) => {
  console.log(`[connection] Connected with user: ${socket.id}`)

  // You can add another socket logic here...
  socket.on('disconnect', () => {
    console.log(`[disconnect] Disconnected with user: ${socket.id}`)
  })
})

// Http server listen
server.listen(port, host, undefined, () => console.log(`Server running on port ${port}`))
