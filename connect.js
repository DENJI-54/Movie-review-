import mongoose from 'mongoose'

const connectDB = async () => {
    try {
      const url = process.env.mongo_url
      await mongoose.connect(url)
      console.log('Connected to MongoDB')
    } catch (error) {
      console.log(`Error connecting to db : ${error}`)
      process.exit(1)
    }
  }

export default connectDB   