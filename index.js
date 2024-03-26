const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config");
 const errorHandler = require("./utils/errorHandller");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//mongodb connected
mongoose.connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
  
app.get('/', (req, res) => {
        res.send("hello word")
    })
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// app.use(errorHandler);
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));