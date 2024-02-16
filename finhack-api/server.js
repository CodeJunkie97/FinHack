const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRoute = require("./routes/auth");


app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", authRoute);



app.listen(8800, ()=> {
    console.log('Back-end server is successfully running');
})