require('dotenv').config({ path: './config.env' })
 express = require('express')
const connectDB = require('./config/db')
const app = express()

// Connect DB
connectDB()

app.use(express.json())
app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})