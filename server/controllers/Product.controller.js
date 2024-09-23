import sharp from 'sharp';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductStock,
    getProductCount,
    getSearchProducts,
    getBrand,
    getBrandProducts
} from "../models/Product.model.js";

export const createProductController = async (req, res) => {
    try {
        const { Name, Description, Brand, Rating, Price, Stock, Discount } = req.body;
        let Image = req.file ? req.file.buffer : null;
        console.log(Image)

        // Compress the image if it exists and is larger than 20KB
        if (Image && Image.length > 10 * 1024) {
            Image = await sharp(Image)
                .resize({ width: 600 })  // Resize image to width 400px
                .jpeg({ quality: 40 })    // Compress to JPEG with 40% quality
                .toBuffer();
        }

        const productId = await createProduct(req.db, { Name, Description, Brand, Rating, Price, Stock, Discount, Image });
        res.status(201).json({ id: productId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProducts(req.db);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductByIdController = async (req, res) => {
    try {
        const product = await getProductById(req.db, req.params.id);
        // Convert image buffer to base64 string
        if (product.Image) {
            product.Image = Buffer.from(product.Image).toString('base64');
        }
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateProductController = async (req, res) => {
    try {
        const { Name, Description, Brand, Rating, Price, Stock, Discount } = req.body;
        let Image = req.file ? req.file.buffer : null;

        // Compress the image if it exists and is larger than 10KB
        if (Image && Image.length > 10 * 1024) {
            Image = await sharp(Image)
                .resize({ width: 600 })  // Resize image to width 600px
                .jpeg({ quality: 40 })   // Compress to JPEG with 40% quality
                .toBuffer();
        }

        // Create an object with all the fields
        let updateFields = {};
        if (Name) updateFields.Name = Name;
        if (Description) updateFields.Description = Description;
        if (Brand) updateFields.Brand = Brand;
        if (Rating) updateFields.Rating = Rating;
        if (Price) updateFields.Price = Price;
        if (Stock) updateFields.Stock = Stock;
        if (Discount) updateFields.Discount = Discount;
        if (Image) updateFields.Image = Image;

        // Update product in the database with conditionally added fields
        const affectedRows = await updateProduct(req.db, req.params.id, updateFields);

        if (affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const deleteProductController = async (req, res) => {
    try {
        const affectedRows = await deleteProduct(req.db, req.params.id);
        if (affectedRows === 0)
            return res.status(404).json({ error: "Product not found" });
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get the Product Stock
export const getProductStockController = async (req, res) => {
    try {
        const data = await getProductStock(req.db);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get the Product Count
export const getProductsCountController = async (req, res) => {
    try {
        const [data] = await getProductCount(req.db);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const getBrandController = async (req, res) => {
    try {
        const data = await getBrand(req.db);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const getBrandProductsController = async (req, res) => {
    try {
        const { b } = req.params;
        const data = await getBrandProducts(req.db, b);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const getSearchProductsController = async (req, res) => {
    try {
        const { q } = req.params;
        console.log(q);
        const [data] = await getSearchProducts(req.db, q);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

