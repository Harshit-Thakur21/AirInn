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

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true
}));
app.use(express.urlencoded({extended:true}));


app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/places', placesRouter);
app.use('/home', homeRouter);
app.use('/bookings', bookingRouter);


app.listen(4000, console.log('Server Started on port 4000'));