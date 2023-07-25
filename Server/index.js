const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const dbConnection =  require('./db')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser') 
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload')
const BASE_URL = process.env.BASE_URL
const path = require('../Client/');
const dotenv = require('dotenv')
dotenv.config()

const app = express()
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
app.use(fileUpload({
}))



// app.use(express.static(path.join(__dirname, './frontend/build')));
// app.use(express.static(path.join(__dirname, '/')))

// static files

app.use(express.static(path.join(__dirname, './frontend/build')))
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './frontend/build/index.html'));
});


app.get('/', (req, res) => {
    res.send('Hello World!')
  })







  app.use('/api/auth', userRoute)





app.listen(BASE_URL, ()=>{
    console.log(`Your app is running at http://localhost:${BASE_URL} 🚀`)
})
