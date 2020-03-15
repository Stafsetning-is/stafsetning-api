import { UserInterface } from "../../../models";
import { Token, AuthResponse, SignupData } from "./interface";
<<<<<<< HEAD

/**
 * Temporary user data
 */
const PLACE_HOLDER_TOKEN = "3agf3r2456siw0a9w2riutu";
const TEMP_USER = {
	difficulty: 7,
	id: "5",
	name: "Jón Sigurðsson"
};
=======
import { FB_SERVICEACCOUNT_KEY } from "../../../util/secrets";
import "firebase/auth";
import "firebase/firestore";
import * as admin from "firebase-admin";
import { app } from "./utils";

admin.initializeApp({
	credential: admin.credential.cert(FB_SERVICEACCOUNT_KEY)
});

const auth = app.auth();
>>>>>>> dev

/**
 * Class encapsulates the logic
 * that concernes working with firebase
 */
export class FireBaseService {
	/**
	 * Returns the auth token and user object 
     * but throws ERROR on unsuccessful attempt
	 * @param phoneNumber the phone number to use on login
	 */
	public static async logIn(mobile: string): Promise<AuthResponse> {
		const user = await admin.auth().getUserByPhoneNumber(FireBaseService.mobileWithCountryCode(mobile));
		const customToken = await admin.auth().createCustomToken(user.uid);
		const fbUser = await auth.signInWithCustomToken(customToken);
		
		return {
            token: customToken,
            user: {
				name: fbUser.user.displayName,
				difficulty: 7
			}
        };
	}

	/**
	 * Returns the user from its auth token
	 * throws error if no user found
	 * @param token user token
	 */
	public static async getUserFromToken(token: Token): Promise<UserInterface> {
		/**
<<<<<<< HEAD
		 * Fill in getUserFromToken @Gabriel
		 */
		const user = TEMP_USER;
		if (!user) throw Error();
		return user;
=======
		 * Fae eftirifarandi villu sem tharf ad laga: 
		 * btw '{"error":{"code":400,"message":"API key not valid. Please pass a valid API key.","errors":[{"message":"API key not valid. Please pass a valid API key.","domain":"global","reason":"badRequest"}],"status":"INVALID_ARGUMENT"}}'
		 */
		// const {user} = await auth.signInWithCustomToken(token);
		// if (!user) throw Error();
		// return {
		// 	name: user.displayName,
		// 	difficulty: 7
		// };
		return {
			difficulty: 7,
			name: "Jón Sigurðsson"
		};
>>>>>>> dev
    }
	
	/**
	 * Returns the auth token and user object 
     * but throws ERROR on unsuccessful attempt
	 * @param signupData the user data
	 */
	public static async signUp({mobile, password1, password2, name}: SignupData): Promise<AuthResponse> {

		if (password1 !== password2) throw Error("Passwords do not match");

		const user = await admin.auth().createUser({
			phoneNumber: FireBaseService.mobileWithCountryCode(mobile),
			password: password1,
			displayName: name
		});

		const token = await admin.auth().createCustomToken(user.uid);

		return {
			token,
			user: {
				name,
				difficulty: 7
			}
		};
	}

	/**
	 * Method for signing users out
	 */
	public static async signOut(): Promise<void> {
		await auth.signOut();
	}
}

	private static mobileWithCountryCode(mobileNo: string) {
		return `+354${mobileNo}`;
	}
}