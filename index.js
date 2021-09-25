const express = require("express");
const axios = require("axios");
const redis = require("redis");
const app = express();

const redisPort = 6379
const client = redis.createClient({host: 'redis', port: redisPort});

client.on("error", (err) => {
    console.log(err);
})

app.get("/movies", (req, res) => {
    const searchTerm = req.query.search;
    try {
        client.get(searchTerm, async (err, jobs) => {
            if (err) throw err;

            if (jobs) {
                res.status(200).send({
                    jobs: JSON.parse(jobs),
                    message: "data retrieved from the cache"
                });
            }
            else {
                const jobs = await axios.get(`https://imdb-api.com/en/API/Search/k_f0vedfn9/${searchTerm}`);
                client.setex(searchTerm, 600, JSON.stringify(jobs.data));
                res.status(200).send({
                    jobs: jobs.data,
                    message: "cache miss"
                });
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Node server started");
});