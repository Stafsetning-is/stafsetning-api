import { UserInterface, PrivateUserInterface } from "../../../models";
import { Token, AuthResponse, SignupData } from "./interface";
import { FB_SERVICEACCOUNT_KEY } from "../../../util/secrets";
import "firebase/auth";
import "firebase/firestore";
import * as admin from "firebase-admin";
import { app } from "./utils";

admin.initializeApp({
	credential: admin.credential.cert(FB_SERVICEACCOUNT_KEY)
});

const auth = app.auth();

/**
 * Class encapsulates the logic
 * that concerns working with firebase
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
	public static async getUserFromToken(token: Token): Promise<PrivateUserInterface> {
		const {user} = await auth.signInWithCustomToken(token);
		if (!user) throw Error();
		return {
			name: user.displayName,
			difficulty: 7,
			id: user.uid
		};
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

	/**
	 * Method to add country code to phone number
	 * @param mobileNo phone number
	 */
	private static mobileWithCountryCode(mobileNo: string) {
		return `+354${mobileNo}`;
	}
}
