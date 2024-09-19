const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection')
const {errorHandler} = require('./middleware/errorHandler')

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:4200/']
}

connectDb()
const app = express();
app.use(express.json(), cors());
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use(errorHandler);

app.listen(port, () =>{
    console.log("server running on", port)
})
