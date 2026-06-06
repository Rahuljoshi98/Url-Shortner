import { getRedisClient } from "../../config/index.js";
const REDIRECT_CACHE_TTL_SECONDS = Number(
  process.env.REDIRECT_CACHE_TTL_SECONDS || 86400,
);

const getCacheKey = (keyPrefix, key) => {
  return `${keyPrefix}:${key}`;
};

const getCachedValue = async (keyPrefix, key) => {
  try {
    const redisClient = getRedisClient();
    if (!redisClient) {
      return null;
    }

    const res = await redisClient.get(getCacheKey(keyPrefix, key));
    return res;
  } catch (error) {
    console.error("Failed to read redis cache:", error.message);
    return null;
  }
};

const cacheValue = async (data) => {
  try {
    const { keyPrefix, key, value } = data;
    const redisClient = getRedisClient();
    if (!redisClient || !keyPrefix || !key || !value) {
      return;
    }

    await redisClient.set(getCacheKey(keyPrefix, key), value, {
      EX: REDIRECT_CACHE_TTL_SECONDS,
    });
  } catch (error) {
    console.error("Failed to write redis cache:", error.message);
  }
};

const deleteCacheValue = async (keyPrefix, key) => {
  try {
    const redisClient = getRedisClient();
    if (!redisClient || !keyPrefix || !key) {
      return;
    }

    await redisClient.del(getCacheKey(keyPrefix, key));
  } catch (error) {}
};

export { getCachedValue, deleteCacheValue, cacheValue };
