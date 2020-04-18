import { Users, UserInterface } from "../index";

// user to be accessed through tests
let user: UserInterface;

beforeAll(async (done) => {
	user = await Users.create({
		name: "Tester 5",
		password: "some password",
		username: "testington7",
		mobile: "5830234",
		difficulty: 4,
	});
	done();
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
		expect(create1()).rejects.toEqual(new Error("test"));
		expect(create2()).rejects.toEqual(new Error("test"));
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
});

describe("User methods", () => {
	it("should upgrade priveledges on .makeAdmin()", async (done) => {
		await user.makeAdmin();
		const found = await Users.findById(user._id);
		expect(found.type).toBe("admin");
		done();
	});

	it("should generate token", async () => {
		const token = await user.generateAuthToken();
		const found = await Users.findOne({
			_id: user._id,
			"tokens.token": token,
		});
		expect(found._id.toString()).toBe(user._id.toString());
	});
});