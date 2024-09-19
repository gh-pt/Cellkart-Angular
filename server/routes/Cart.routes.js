// routes/cartRoutes.js
import express from 'express';
import { addProductController, clearCartController, getCartController, getCartCountController, removeProductController, updateQuantityController } from '../controllers/Cart.controller.js';


const router = express.Router();

router.post('/addCart', addProductController);
router.get('/getCart/:userId', getCartController);
router.put('/updateCart', updateQuantityController);
router.delete('/removeCart/:cartId', removeProductController);
router.delete('/clearCart/:userId', clearCartController);
router.get('/getCartCount',getCartCountController);

export default router;
