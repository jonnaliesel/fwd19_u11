require('dotenv').config({ path: './config.env' })
 express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const app = express()

// Connect DB
connectDB()

app.use(express.json())
app.use('/api/auth', require('./routes/auth'))

// Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})