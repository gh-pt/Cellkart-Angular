// Get All User
export async function getAllUser(connection) {
    try {
        const [result] = await connection.query("SELECT * from User where Role='user'");
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Get User By userName
export async function getUserByUserName(connection, userName) {
    try {
        const query = `SELECT * FROM User WHERE LOWER(UserName) LIKE LOWER(?) AND Role = 'user'`;
        const searchTerm = `%${userName}%`; // Wrap the search term with wildcards
        const [result] = await connection.query(query, [searchTerm]);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Delete User by userName
export async function deleteUserByUserName(connection, userName) {
    try {
        const response = await connection.query(`DELETE from User where UserName=?`, [userName]);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Update user Data by userName
export async function updateUserByUserName(connection, userName, user) {
    try {
        const response = await connection.query(
            `UPDATE User SET UserName = ?, Password=?, Email=?, Image=?, Address=? WHERE UserName=?`,
            [user.UserName, user.Password, user.Email, user.image, user.Address, userName]
        );
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Add the User
export async function addUser(connection, UserName, Password, Email, Image, Role, Address) {
    try {
        const [rows] = await connection.query(
            `INSERT INTO User (UserName, Password, Email, Image, Role, Address) VALUES (?, ?, ?, ?, ?, ?)`,
            [UserName, Password, Email, Image, Role, Address]
        );
        return { User:{ UserName, Password, Email ,Image, Role, Address } };
    } catch (error) {
        console.log(error);
    }
}

// Login User
export async function loginUser(connection, email, password) {
    try {
        const [result] = await connection.query(
            `SELECT * FROM User WHERE Email = ? AND Password = ?`,
            [email, password]
        );

        // If user is found, result will be an array with a length > 0
        if (result.length > 0) {
            const user = result[0];

            // Check the role and return the appropriate redirect path
            if (user.Role === 'admin') {
                return { user, redirectPath: '/Public-Api/admin' };
            } else if (user.Role === 'user') {
                return { user, redirectPath: '/Public-Api/' };
            } else {
                return { user, redirectPath: '/Public-Api/' };
            }
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error; 
    }
}


// Get the counts of User
export async function getUserCount(connection){
    try {
        const query = "SELECT COUNT(*) AS Count FROM User WHERE ROLE = 'user'";
        const [result] = await connection.execute(query);
        return result;
    } catch (error) {
        console.log(error);
    }
}