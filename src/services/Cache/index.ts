import Redis, { Redis as IRedis } from "ioredis";

let booted = false;

/**
 * Caching service class
 * This class can (and only should be) initialized by node on startup
 *
 * The class encapsulates RedisClient
 *
 * .put works sync. Has optional parameter time (in seconds) for expiry
 *
 * .get returns a promise
 */
class CachingService {
	private initialized: boolean;
	private Redis: IRedis;

	private constructor() {
		this.initialized = false;
	}

	public static Start() {
		if (booted) throw Error("Can't start two redis instances");
		// static methood to return instance
		booted = true;
		return new CachingService();
	}

	public setRedis(Redis: IRedis) {
		// sets the redis client
		if (this.initialized) return;
		this.Redis = Redis;
		this.initialized = true;
	}

	/**
	 *
	 * @param key is a string
	 * @param value can be any javascript primitive or object based type
	 * @param time optional parameter for expiry of key (seconds)
	 */
	public put<T>(key: string, value: T, time?: number) {
		const stringified = JSON.stringify(value);
		if (time) {
			return this.Redis.setex(key, time, stringified);
		}
		this.Redis.set(key, stringified);
	}

	/**
	 * returns a promise
	 * @param key is a string
	 * Throws error if key is not found
	 */
	public async get<T>(key: string): Promise<T> {
		return await new Promise((resolve, reject) => {
			this.Redis.get(key, (err, data) => {
				try {
					if (err || !data) reject();
					if (data) resolve(JSON.parse(data));
				} catch (e) {
					reject();
				}
			});
		});
	}

	public updateTTL(key: string, time: number) {
		this.Redis.expireat(key, time);
	}
}

export const Cache = CachingService.Start();
