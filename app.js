const express = require('express')
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// middleware
app.use(express.json())
app.use(express.static('./public'))

//  Routes
app.use('/api/v1/tasks', tasks)

// error handling middleware
app.use(notFound)
app.use(errorHandlerMiddleware)


// port declaration
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}...`);
          });
    } catch (error) {
       console.log(error); 
    }
}

// starting the server using the server function created above
start();




