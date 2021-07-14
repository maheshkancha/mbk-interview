const express = require('express');
const router = express.Router();
const { getAllUsers,
    getUserById,
    saveUser
} = require('../repo/user');

router.get('/', async (req, res) => {
    const userList = await getAllUsers();
    res.status(200).json({ users: userList });
});

router.get('/:id', async (req, res) => {
    const user = await getUserById(req.params.id);
    res.status(200).json({ user });
});

router.post('/', async (req, res) => {
    const user = await saveUser(req.body);
    res.status(200).json({ message: 'User document inserted successfully.' });
});

module.exports = router;
