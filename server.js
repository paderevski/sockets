const express=require('express')
const socket = require('socket.io')

const PORT = 5000
const app = express()
const server = app.listen(PORT, () => {
    console.log("Listening on port ${PORT}")
    console.log('http://localhost:${PORT}')
})

const activeUsers = new Set();

app.use(express.static("public"))

const io = socket(server)

io.on("connection", () => {
    console.log('Made socket connection')

    socket.on("new user", (data) => {
        socket.userId = data
        activeUsers.add(data)
        io.emit("new user", [...activeUsers]);
    })

    socket.on("disconnect", () => {
        activeUsers.delete(socket.userId)
        io.emit("user disconnected", socket.userId);
    })
})
