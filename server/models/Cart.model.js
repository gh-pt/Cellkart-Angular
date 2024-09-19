// models/cartModel.js

export async function addProduct(db, userId, prodId, quantity) {
    // Limit the maximum quantity to 20
    if (quantity > 20) {
        throw new Error('Quantity cannot exceed 20.');
    }

    // Check if the product is in stock
    const [productRows] = await db.execute(
        "SELECT Price, Stock FROM Products WHERE prodId = ?",
        [prodId]
    );
    console.log("productRows:", productRows);

    if (productRows.length === 0 || productRows[0].Stock <= 0) {
        throw new Error('Product is out of stock.');
    }

    const price = productRows[0].Price; // Get the product price
    const stock = productRows[0].Stock; // Get the product stock
    const calculatedTotalPrice = quantity * price; // Calculate total price

    // Check current quantity in cart for the product
    const [cartRows] = await db.execute(
        "SELECT * FROM Cart WHERE userId = ? AND prodId = ?",
        [userId, prodId]
    );
    console.log("cartRows:", cartRows);

    if (cartRows.length > 0) {
        // If the product is already in the cart, check available stock
        const currentQuantity = cartRows[0].quantity;
        console.log("currentQuantity:", currentQuantity);

        const newQuantity = currentQuantity + quantity; // Calculate new total quantity
        console.log("newQuantity:", newQuantity);

        // Check if adding the new quantity exceeds stock
        if (newQuantity > stock) {
            throw new Error('Not enough stock available.');
        }

        // Update the cart with the new quantity and total price
        await db.execute(
            "UPDATE Cart SET quantity = ?, totalPrice = ? WHERE userId = ? AND prodId = ?",
            [newQuantity, newQuantity * price, userId, prodId]
        );
    } else {
        // If the product is not in the cart, check if it can be added
        if (quantity > stock) {
            throw new Error('Not enough stock available.');
        }

        // Insert new product into the cart
        await db.execute(
            "INSERT INTO Cart (userId, prodId, quantity, totalPrice) VALUES (?, ?, ?, ?)",
            [userId, prodId, quantity, calculatedTotalPrice]
        );
    }

    // Update the stock quantity of the product after adding to the cart
    await db.execute(
        "UPDATE Products SET Stock = Stock - ? WHERE prodId = ?",
        [quantity, prodId]
    );
}

export async function getCartByUser(db, userId) {
    const [rows] = await db.execute(
        `SELECT p.name, p.description, p.price, c.quantity, c.totalPrice, c.cartId 
            FROM Cart c 
            INNER JOIN Products p ON c.prodId = p.prodId 
            WHERE c.userId = ?`,
        [userId]
    );
    return rows;
}

export async function updateQuantity(db, cartId, quantity) {
    // Limit the maximum quantity to 20
    if (quantity > 20) {
        throw new Error('Quantity cannot exceed 20.');
    }

    // Check current stock availability for the product in cart
    const [cartRows] = await db.execute(
        "SELECT c.quantity, p.price, p.stock FROM Cart c INNER JOIN Products p ON c.prodId = p.prodId WHERE c.cartId = ?",
        [cartId]
    );
    console.log("cartRows1:", cartRows);

    if (cartRows.length === 0) {
        throw new Error('Cart item not found.');
    }

    const currentQuantity = cartRows[0].quantity; // Existing quantity in the cart
    console.log("currentQuantity1:", currentQuantity);

    const stockAvailable = cartRows[0].stock; // Available stock for the product
    console.log("stockAvailable:", stockAvailable);

    const price = cartRows[0].price; // Product price

    // Calculate the new total quantity to be updated in the cart
    const newTotalQuantity = currentQuantity + quantity; // Adding new quantity to current quantity
    console.log("newTotalQuantity:", newTotalQuantity);

    // Check if the new total quantity exceeds stock
    if (newTotalQuantity > stockAvailable) {
        throw new Error('Not enough stock available.');
    }

    // Update the quantity and total price in the cart
    await db.execute(
        "UPDATE Cart SET quantity = ?, totalPrice = ? WHERE cartId = ?",
        [newTotalQuantity, newTotalQuantity * price, cartId]
    );

    // Update the stock in the Products table
    await db.execute(
        "UPDATE Products SET stock = stock - ? WHERE prodId = (SELECT prodId FROM Cart WHERE cartId = ?)",
        [quantity, cartId]
    );
}

export async function removeProduct(db, cartId) {
    return await db.execute("DELETE FROM Cart WHERE cartId = ?", [cartId]);
}

export async function clearCart(db, userId) {
    return await db.execute("DELETE FROM Cart WHERE userId = ?", [userId]);
}

export async function getCartCount(db) {
    const [result] = await db.execute('SELECT COUNT(*) AS Count FROM Cart');
    return result;
}


