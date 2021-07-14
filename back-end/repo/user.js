const User = require('../schema/user');
const { ObjectId } = require('mongoose').Types;

const getAllUsers = async () => {
    let userList = [];
    const users = await User.find({});
    users.forEach(user => {
        userList.push(user);
    })

    return userList;
}

const getUserById = async (id) => {
    return await User.find({ _id: ObjectId(id) });
}

const saveUser = async user => {
    const userObj = new User();
    return await userObj.save(user);
}

module.exports = {
    getAllUsers,
    getUserById,
    saveUser
}
