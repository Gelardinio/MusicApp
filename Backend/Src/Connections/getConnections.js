const pool = require("../Database/db");

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

async function calcuserSimilarity(userId, connectionId) {
    const user = await pool.query(
        `SELECT genre_1, genre_2, genre_3 FROM userTable WHERE userId = $1`, [userId]
    );
    
    const connection = await pool.query(
        `SELECT genre_1, genre_2, genre_3 FROM userTable WHERE userId = $1`, [connectionId]
    );

    if (!user || !user.length || !connection || !connection.length) {
        return 0;
    }

    const userGenres = user[0].genres.split(",");
    const connectionGenres = connection[0].genres.split(",");

    const common = userGenres.filter((genre) => connectionGenres.includes(genre));

    return common.length;
}

async function calcLocationSimilarity(userId, connectionId) {
    const user = await pool.query(
        `SELECT longitude, latitude FROM activeUsers WHERE userId = $1`, [userId]
    );

    const connection = await pool.query(
        `SELECT longitude, latitude FROM activeUsers WHERE userId = $1`, [connectionId]
    );    

    if (!user || !user.length || !connection || !connection.length) {
        return 0;
    }

    const userLongitude = user[0].longitude;
    const userLatitude = user[0].latitude;
    const connectionLongitude = connection[0].longitude;
    const connectionLatitude = connection[0].latitude;

    const phi1 = degreesToRadians(userLatitude);
    const phi2 = degreesToRadians(connectionLatitude);
    const deltaPhi = degreesToRadians(connectionLatitude - userLatitude);
    const deltaLambda = degreesToRadians(connectionLongitude - userLongitude);

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const R = 6371;

    const distance = R * c;

    return distance;
}

async function getRecommendations(userId, NumToGet) {
    try {
        let count = 0;
        let idToGet = userId;

        let toRecommend = [];
        let stack = [];

        while (count < NumToGet && stack.length > 0) {
            const ids = await pool.query(
                `SELECT connectionId FROM connections WHERE person = '${idToGet}'`
            );

            for (const row of ids) {
                stack.push(row.connectionId);
            }

            while (stack.length > 0) {
                const connection = stack.pop();
                const userSimilarity = await calcuserSimilarity(userId, connection);
                const connectionLocation = await calcLocationSimilarity(userId, connection);

                if (userSimilarity > 0) {
                    const weightedSimilarity = userSimilarity * 0.8 + (1 / connectionLocation) * 0.2;
                    toRecommend.push({ userId: connection, similarity: weightedSimilarity });
                    count++;
                }
            }

            toRecommend.sort((a, b) => b.similarity - a.similarity);

            if (toRecommend.length > 0) {
                idToGet = toRecommend[toRecommend.length - 1].userId;
            } else {
                break;
            }
        }

        const recommendedUserIds = toRecommend.map((item) => item.userId);

        return recommendedUserIds;
    } catch (err) {
        console.log(err.message);
        throw new Error("Server Error");
    }
}

module.exports = async (req, res) => {
    try {
        const userId = req.userId;
        const NumToGet = req.NumToGet;
        
        const recommendedUserIds = await getRecommendations(userId, NumToGet);

        res.json(recommendedUserIds);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
};
