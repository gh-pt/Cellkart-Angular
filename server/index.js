// app.js
import express from 'express';
import cors from 'cors';
import connectDB from './db/Mysql.db.js';
import userRoutes from './routes/User.routes.js';
import productRoutes from './routes/Product.routes.js'; 
import CartRoutes from './routes/Cart.routes.js'
import morgan from 'morgan';
import { getUserCount } from './models/User.model.js'
import { getProductCount  } from './models/Product.model.js'
import { getCartCount } from './models/Cart.model.js'


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

let mysqlDB;

app.use(async (req, res, next) => {
    if (!mysqlDB) {
        mysqlDB = await connectDB();        
    }
    req.db = mysqlDB; // Attach the DB connection to the request object
    next();
});

app.get('/api/dashboard/data',async(req,res)=>{
    try {
        const userCount = await getUserCount(req.db);
        const prodCount = await getProductCount(req.db);
        const cartCount = await getCartCount(req.db);
    
        res.status(200).json({userCount, prodCount, cartCount});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// Use the routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes); // Use product routes
app.use('/api/cart',CartRoutes );


app.listen(5001, () => {
    console.log("Application server started... on port 5001");
});
