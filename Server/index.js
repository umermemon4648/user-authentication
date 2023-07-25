const express = require('express')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const dbConnection =  require('./db')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser') 
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload')
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()

const app = express()
dbConnection()

const BASE_URL = process.env.BASE_URL
// const port = 5000
// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


app.use(cors({origin: "https://user-authentication-frontend-indol.vercel.app/", credentials: true  }))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,limit: '50mb'}))
app.use(fileUpload({
}))



// app.use(express.static(path.join(__dirname, '../Client/dist')))

// // static files
// app.get('*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, '../Client/dist/index.html'));
// });


app.get('/', (req, res) => {
    res.send('Hello World!')
  })







  app.use('/api/auth', userRoute)





app.listen(BASE_URL, ()=>{
    // console.log(`Your app is running at http://localhost:${port} 🚀`)
    console.log(`Your app is running at ${BASE_URL} 🚀`)
})
