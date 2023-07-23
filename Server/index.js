const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const dbConnection =  require('./db')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser') 
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload')

const app = express()
const dotenv = require('dotenv')
dotenv.config()

const port = 5000
dbConnection()

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


app.use(cors({origin: "http://localhost:5173", credentials: true  }))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
app.use(fileUpload())



app.get('/', (req, res) => {
    res.send('Hello World!')
  })







  app.use('/api/auth', userRoute)





app.listen(port, ()=>{
    console.log(`Your app is running at http://localhost:${port} 🚀`)
})
