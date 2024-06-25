import cache from "../../config/nodeCache.config.js";

const setCache = (key, data, ttlInSeconds) => {
  const result = cache.set(key, data, ttlInSeconds);
  return result;
};

const getCache = (key) => {
  const result = cache.get(key);
  return result;
};

const deleteCache = (key) => {
  const result = cache.del(key);
  return result;
};

const getCacheKey = (req) => {
  const key = req.originalUrl;
  return key;
};

export default {
  setCache,
  getCache,
  deleteCache,
  getCacheKey,
};
