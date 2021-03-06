import Redis, { Redis as IRedis } from "ioredis";

let booted = false;

class CachingService {
	private initialized: boolean;
	private Redis: IRedis;

	private constructor() {
		this.initialized = false;
	}

	/**
	 * Starts singleton class
	 */
	public static Start() {
		if (booted) throw Error("Can't start two redis instances");
		// static methood to return instance
		booted = true;
		return new CachingService();
	}

	/**
	 * takes in a redis as argmuent and sets it as the
	 * store to use
	 * @param Redis Redis object
	 */
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
		if (process.env.NODE_ENV === "test") return undefined;
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
			if (process.env.NODE_ENV === "test") return reject();
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

	/**
	 * changes a previous key's TTL in redis
	 * @param key key in redis store
	 * @param time new TTL
	 */
	public updateTTL(key: string, time: number): void {
		if (process.env.NODE_ENV === "test") return undefined;
		this.Redis.expireat(key, time);
	}
}

export const Cache = CachingService.Start();
