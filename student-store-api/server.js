const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config(); 

const PORT = 3000;

// middleware
app.use(express.json());


// Home route
app.get("/",(req,res)=>{
 res.send("Hello, Backend!");
});



app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);



// start server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});






