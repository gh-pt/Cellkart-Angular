import { getAllUser, addUser, getUserByUserName, updateUserByUserName, deleteUserByUserName, loginUser, getUserCount } from '../models/User.model.js';

export async function getAllUsers(req, res) {
    try {
        const data = await getAllUser(req.db);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}

export async function addUserController(req, res) {
    const { UserName, Password, Email, Role = 'user', Address } = req.body; // Set default role to 'user'
    const image = req.file ? req.file.buffer : null;
    try {
        const data = await addUser(req.db, UserName, Password, Email, image, Role, Address); // Pass role to addUser function
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}


export async function getUserByUserNameController(req, res) {
    const { UserName } = req.params;
    try {
        const data = await getUserByUserName(req.db, UserName);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}

export async function updateUserByUserNameController(req, res) {
    const { userName } = req.params;
    console.log(userName);
    console.log(req.body);
    const { UserName, Password, Email, Address } = req.body;
    const image = req.file ? req.file.buffer : null;
    try {
        const data = await updateUserByUserName(req.db, userName,{
            UserName,
            Password,
            Email,
            Address,
            image
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}

export async function deleteUserByUserNameController(req, res) {
    const { UserName } = req.params;
    try {
        const data = await deleteUserByUserName(req.db, UserName);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}

export async function loginController(req, res) {
    const { email, password } = req.body;
    try {
        const result = await loginUser(req.db, email, password);
        if (result) {
            const { user, redirectPath } = result;
            res.json({
                message: "User successfully logged in",
                User: user,
                redirectPath: redirectPath,
            });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}


// Get the User Count
export async function getUserCountController(req,res) {
    try {
        const [result] = await getUserCount(req.db);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
    
}