const express = require("express");
const app = express();

const PORT = 3000;

// middleware
app.use(express.json());


// Home route
app.get("/",(req,res)=>{
 res.send("Hello, Backend!");
});



// start server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});






