import { Users, UserInterface } from "../index";

// user to be accessed through tests
let user: UserInterface;

beforeEach(async (done) => {
	try {
		await Users.findByIdAndDelete(user._id);
	} catch (error) {
		// do nothing
	} finally {
		user = await Users.create({
			name: "Tester 5",
			password: "some password",
			username: "testington7",
			mobile: "5830234",
			difficulty: 4,
		});
		done();
	}
});

describe("User creation", () => {
	it("Should hash password when created", async (done) => {
		const instance = await Users.create({
			name: "Tester 5",
			password: "some password",
			username: "testington",
			mobile: "5810234",
			difficulty: 4,
		});
		expect(instance.password).not.toEqual("some password");
		done();
	});

	it("Should not allow difficulty out of range", async (done) => {
		const create1 = async () => {
			try {
				await Users.create({
					name: "Tester 5",
					password: "some password",
					username: "testington1",
					mobile: "5810235",
					difficulty: 0,
				});
			} catch (error) {
				throw Error("test");
			}
		};
		const create2 = async () => {
			try {
				await Users.create({
					name: "Tester 5",
					password: "some password",
					username: "testington2",
					mobile: "5810236",
					difficulty: 12,
				});
			} catch (error) {
				throw Error("test");
			}
		};
		await expect(create1()).rejects.toEqual(new Error("test"));
		await expect(create2()).rejects.toEqual(new Error("test"));
		done();
	});

	it("Should not allow creation of admins", async (done) => {
		const user = await Users.create({
			name: "Tester 5",
			password: "some password",
			username: "testington2",
			mobile: "5810236",
			difficulty: 10,
			type: "admin",
		});
		expect(user.type).toBe("user");
		done();
	});

	it("should upgrade priveledges on .makeAdmin()", async (done) => {
		await user.makeAdmin();
		const found = await Users.findById(user._id);
		expect(found.type).toBe("admin");
		done();
	});

	it("should generate token", async (done) => {
		const token = await user.generateAuthToken();
		const found = await Users.findOne({
			_id: user._id,
			"tokens.token": token,
		});
		expect(found._id.toString()).toBe(user._id.toString());
		done();
	});

	it("should not update difficulty value", async (done) => {
		const update1 = async () => {
			try {
				user.difficulty = 12;
				await user.save();
			} catch (error) {
				throw Error("test");
			}
		};
		const update2 = async () => {
			try {
				user.difficulty = 0;
				await user.save();
			} catch (error) {
				throw Error("test");
			}
		};
		await expect(update1()).rejects.toEqual(new Error("test"));
		await expect(update2()).rejects.toEqual(new Error("test"));
		done();
	});

	it("should update difficulty value", async (done) => {
		const update1 = async () => {
			try {
				user.difficulty = 5;
				await user.save();
			} catch (error) {
				throw Error("test");
			}
		};
		const update2 = async () => {
			try {
				user.difficulty = 1;
				await user.save();
			} catch (error) {
				throw Error("test");
			}
		};
		await update1();
		expect(user.difficulty).toBe(5);
		await update2();
		expect(user.difficulty).toBe(1);
		done();
	});
});
