import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

let redisClient = null;

const connectRedis = async () => {
  if (!process.env.REDIS_URL) {
    console.log("Redis disabled: REDIS_URL is not configured");
    return null;
  }

  if (redisClient?.isReady) {
    return redisClient;
  }

  redisClient = createClient({
    url: process.env.REDIS_URL,
    socket: {
      reconnectStrategy: false,
    },
  });

  redisClient.on("error", (error) => {
    console.error("Redis error:", error.message);
  });

  try {
    await redisClient.connect();
    console.log("Connected to Redis successfully");
    return redisClient;
  } catch (error) {
    console.error("Redis connection failed:", error.message);
    redisClient = null;
    return null;
  }
};

const getRedisClient = () => {
  if (!redisClient?.isReady) {
    return null;
  }

  return redisClient;
};

export { connectRedis, getRedisClient };
