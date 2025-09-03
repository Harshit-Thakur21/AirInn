const express = require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/db')
connectToDB();
const cors = require('cors');
const cookieParser = require('cookie-parser');


const userRouter = require('./routes/user.routes');
const uploadRouter = require('./routes/uploads.routes');
const placesRouter = require('./routes/places.routes');
const homeRouter = require('./routes/home.routes');
const bookingRouter = require('./routes/booking.routes');



// // Allow both dev + prod frontend URLs
// const allowedOrigins = [
//   'http://localhost:5173',   // dev
//   'https://air-inn.vercel.app' // prod
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));


// Later you add cors AGAIN
app.use(cors({
  origin: 'http://localhost:5173',//process.env.CLIENT_URL || 
  credentials: true
}));


app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(express.urlencoded({extended:true}));


app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/places', placesRouter);
app.use('/home', homeRouter);
app.use('/bookings', bookingRouter);


const PORT = 4000; //process.env.PORT || 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));