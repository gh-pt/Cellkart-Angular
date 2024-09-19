// routes/Product.routes.js
import express from 'express';
import {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
    getProductStockController,
    getProductsCountController,
    getBrandController,
    getSearchProductsController,
    getBrandProductsController
} from '../controllers/Product.controller.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/addProd',upload.single('Image'), createProductController);
router.get('/getAllProd', getAllProductsController);
router.get('/getProdById/:id', getProductByIdController);
router.put('/updateProd/:id',upload.single('Image'), updateProductController);
router.delete('/deleteProd/:id', deleteProductController);
router.get('/getProdStock',getProductStockController);
router.get('/getProdCount', getProductsCountController);
router.get('/getBrand', getBrandController);
router.get('/getBrandProds/:b', getBrandProductsController);
router.get('/searchProducts/:q', getSearchProductsController);


export default router;
