import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import flightRoutes from './routes/flightRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/airline-tickets')
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.log('✗ MongoDB connection error:', err))

// Routes
app.use('/api/flights', flightRoutes)
app.use('/api/bookings', bookingRoutes)

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`)
})
