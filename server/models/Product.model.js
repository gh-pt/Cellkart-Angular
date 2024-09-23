// models/productModel.js
export const createProduct = async (db, product) => {
    const query = 'INSERT INTO Products (Name, Description, Brand, Rating, Price, Stock, Discount, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [results] = await db.execute(query, [product.Name, product.Description, product.Brand, product.Rating, product.Price, product.Stock, product.Discount, product.Image]);
    return results.insertId;
};

export const getAllProducts = async (db) => {
    const query = 'SELECT * FROM Products';
    const [results] = await db.execute(query);
    return results;
};

export const getProductById = async (db, id) => {
    const query = 'SELECT * FROM Products WHERE prodId = ?';
    const [results] = await db.execute(query, [id]);
    return results[0];
};

// export const updateProduct = async (db, id, product) => {
//     const query = 'UPDATE Products SET Name = ?, Description = ?, Brand = ?, Rating = ?, Price = ?, Stock = ?, Discount = ?, Image = ? WHERE prodId = ?';
//     const [results] = await db.execute(query, [product.Name, product.Description, product.Brand, product.Rating, product.Price, product.Stock, product.Discount, product.Image, id]);
//     return results.affectedRows;
// };

export const updateProduct = async (db, id, product) => {
    // Build the query dynamically based on which fields are present in product
    const fields = Object.keys(product);
    const placeholders = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE Products SET ${placeholders} WHERE prodId = ?`;

    // Prepare values to be passed to the query
    const values = [...Object.values(product), id];
    const [results] = await db.execute(query, values);
    return results.affectedRows;
};


export const deleteProduct = async (db, id) => {
    const query = 'DELETE FROM Products WHERE prodId = ?';
    const [results] = await db.execute(query, [id]);
    return results.affectedRows;
};

// Get the Product stock
export const getProductStock = async(db)=>{
    const query = 'SELECT prodId, Name, Brand, Stock FROM Products';
    const [result] = await db.execute(query);
    return result;
}

// Get the Product count
export const getProductCount = async(db)=>{
const query = 'SELECT COUNT(*) AS Count FROM Products';
    const [result] = await db.execute(query);
    return result;
}

export const getBrand = async (db) => {
    const query = 'SELECT DISTINCT Brand FROM Products';
    const [results] = await db.execute(query);
    return results;
};

export const getBrandProducts = async (db,brand) => {
    const query = 'SELECT * FROM Products WHERE Brand = ?';
    const [results] = await db.execute(query,[brand]);
    return results;
};

export const getSearchProducts = async (db, q) => {
    // Using a wildcard for partial matches
    const query = 'SELECT * FROM Products WHERE LOWER(Name) LIKE LOWER(?)';
    const searchTerm = `%${q}%`;
    
    // Execute the query with the search term
    const results = await db.execute(query, [searchTerm]);
    return results;
};

