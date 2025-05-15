const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
require("dotenv").config(); 

const PORT = 3000;

app.use(cors());
// middleware
app.use(express.json());


// Home route
app.get("/",(req,res)=>{
 res.send("Hello, Backend!");
});



app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);




// start server
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
});






