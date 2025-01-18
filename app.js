const express = require('express');
const connectDB = require('./config/db.config');  //import connectDB
const categoryRouter = require('./routers/category.router');
const brandRouter = require('./routers/brand.router');
const productRouter = require('./routers/product.router');
const customerRouter = require('./routers/customer.router');
const userTypeRouter = require('./routers/userType.router');
const userRouter = require('./routers/user.router')
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin:'http://localhost:4200' //front route
}));
const port = 3000;
connectDB();

// app.use((req,res)=>{
//     console.log("hello");
//     res.send('<h1>hello from server2</h1>');
// })

app.use('/images',express.static('./imgs'));//to access it by /images in angular

app.use('/category',categoryRouter);
app.use('/brand',brandRouter);
app.use('/product',productRouter);
app.use('/customer',customerRouter);

app.use('/userType',userTypeRouter);
app.use('/user',userRouter);




app.listen(port,()=>{
    console.log(`server running on port: ${port}`);
})

