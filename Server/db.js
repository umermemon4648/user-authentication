const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const mongoUri = process.env.MONGODB_URI

console.log(mongoUri)
const dbConnection =  async ()=>{
    try {
        const {con} = await mongoose.connect(mongoUri)
        console.log('con: ', con)
        console.log('connection created successfully');
    } catch (error) {
        console.log('Failed to connect with database');
        console.log(`Error: ${error.message}`)   
    }
}
module.exports = dbConnection