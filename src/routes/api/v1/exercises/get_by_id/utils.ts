import { Types } from "mongoose";

export const getCacheKey = (id: string) => `exercise:${id}`;

export const CACHE_TTL_SEC = 60 * 60;
