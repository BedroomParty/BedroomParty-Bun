const path = require('path');
const fs = require('fs').promises;

module.exports = {
    path: `/user/:id/avatar`,
    description: `Displays a user's avatar`,
    params: {
        id: {
            type: `integer`,
            description: `The user's game ID`,
            required: true,
        }
    },
    get: async (req, res) => {
        const imgPath = path.join(process.cwd(), `./src/extras/Users/Avatars/${req.params.id}.png`);

        console.log(`imgPath`, imgPath);

        await fs.mkdir(path.dirname(imgPath), { recursive: true }).catch(() => {});

        const exists = await fs.access(imgPath).then(() => true).catch(() => false);

        if(exists) {
            res.sendFile(imgPath);
        } else {
            res.status(404).send({ error: `Avatar not found` });
        }
    }
}

module.exports.get.tests = [
    {
        path: `/user/76561198273216952/avatar`,
        description: `Successful user lookup`,
        response: `[raw png data will be returned]`
    },
    {
        path: `/user/1/avatar`,
        description: `Invalid user lookup`
    }
]