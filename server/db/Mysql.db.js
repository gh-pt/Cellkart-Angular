import mysql from 'mysql2/promise'

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "P@ssw0rd",
            database: "cellkart",
        });
        console.log("Mysql connected Successfully");
        return connection;
    } catch (error) {
        console.log("Database connection error:", error);
        throw error;
    }
};

export default connectDB;
