const redis = require('redis');
// Ensure REDIS_URL is in your .env
const client = redis.createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

exports.getOrSet = async (key, cb) => {
    try {
        const data = await client.get(key);
        if (data) return JSON.parse(data);
        
        const freshData = await cb();
        // Cache for 1 hour (3600 seconds)
        await client.setEx(key, 3600, JSON.stringify(freshData));
        return freshData;
    } catch (e) {
        console.error("Redis Error, falling back to DB", e);
        return await cb(); // Fallback if Redis fails
    }
};
