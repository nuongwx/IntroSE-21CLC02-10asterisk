const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const upload = require('express-fileupload');

const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database connected');
    const a = require('./models/index');
    a.test();
}).catch((err) => {
    console.log(err);
});


var app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload());

const indexRouter = require('./router/index');
const authRouter = require('./router/auth.js');

app.use('/auth', authRouter);

app.use('/api', indexRouter);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

