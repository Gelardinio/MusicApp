module.exports = async (req , res) => {

    try {
        const { id } = req.body;

        const username = await pool.query(
            `SELECT * FROM person WHERE id = '${userId}' FETCH FIRST 1 ROWS ONLY`
        )

        data = { "username": username }

        res.json(data)

    } catch (err) {
        console.log(err.message);
    }

};