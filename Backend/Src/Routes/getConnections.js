const pool = require("../Database/db");

module.exports = async (req , res) => {

    try {
        let count = 0;
        const NumToGet = req.NumToGet;
        let idToGet = req.userId;

        const UserId = await pool.query(
            `SELECT * FROM person WHERE id = '${req.userId}' FETCH FIRST 1 ROWS ONLY`
        )

        let toRecommend = [];
        let stack = [];

        while(count < NumToGet) {

            const ids = await pool.query(
                `SELECT (connectionId) FROM connections WHERE person = '${idToGet}'`
            )

            for(let i = 0; i < ids.length(); i++) {
                stack.push(ids[i]);
            }
    
            while(stack.length() > 0) {
                const connection = stack.pop();
                const connectionIds = await pool.query(
                    `SELECT (connectionId) FROM connections WHERE person = '${connection}'`
                )

                for(let i = 0; i < connectionIds.length(); i++) {
                    let isConnected = false;
                    for(let j = 0; j < ids.length(); i++) {
                        if(connectionIds[i] == ids[j]) {
                            isConnected = true;
                        }
                    }
                    if(!isConnected) {
                        toRecommend.push(connectionIds[i]);
                        count++;
                    }
                }

            }

            idToGet = Math.random(connectionIds.length());
        }

        res.json(connectionIds);

    } catch (err) {
        console.log(err.message);
    }

};