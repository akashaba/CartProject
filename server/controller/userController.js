const User = require('../model/User')

exports.getAll = (req, res, next) => {
    res.status(200).json(User.getAll());
}
exports.save = (req, res, next) => {
    const addedUser = new User(null, req.body.username, req.body.password).save();
    res.status(201).json(addedUser);
}
exports.find = (req, res, next) => {
    const { username, password } = req.body;
    const user = User.find(username, password);
    if (user) {
        res.status(200).send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
}