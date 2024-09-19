// controllers/cartController.js
import { addProduct, getCartByUser, updateQuantity, removeProduct, clearCart, getCartCount } from "../models/Cart.model.js";


export async function addProductController(req, res) {
    console.log(req.body);
    const { userId, prodId, quantity } = req.body;

    try {
        await addProduct(req.db, userId, prodId, quantity);
        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export async function getCartController(req, res) {

    const { userId } = req.params;

    try {
        const cartItems = await getCartByUser(req.db, userId);
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export async function updateQuantityController(req, res) {
    console.log(req.body);
    const { cartId, quantity } = req.body;

    try {
        await updateQuantity(req.db, cartId, quantity);
        res.status(200).json({ message: 'Cart quantity updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function removeProductController(req, res) {
    const { cartId } = req.params;

    try {
        await removeProduct(req.db, cartId);
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

export async function clearCartController(req, res) {
    const { userId } = req.params;

    try {
        await clearCart(req.db, userId);
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export async function getCartCountController(req,res) {
    try {
        const [data] = await getCartCount(req.db);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


