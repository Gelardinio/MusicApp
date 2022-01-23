const jwt = require("jsonwebtoken");

module.exports = async (req , res) => {
    const {username, password} = req.body;

    res.json({data: "bruh"});
};