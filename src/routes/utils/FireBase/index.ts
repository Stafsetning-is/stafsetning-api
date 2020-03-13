import { UserInterface } from "../../../models";
import { Token, AuthResponse, SignupData } from "./interface";
import { FB_SERVICEACCOUNT_KEY } from "../../../util/secrets";
import "firebase/auth";
import "firebase/firestore";
import * as admin from "firebase-admin";
import { app } from "../../../../src/auth";

// const TEMP_USER = {
// 	difficulty: 7,
// 	id: "5",
// 	name: "Jón Sigurðsson"
// };
admin.initializeApp({
	credential: admin.credential.cert(FB_SERVICEACCOUNT_KEY)
});
const auth = app.auth();

/**
 * Class encapsulates the logic
 * that concernes working with firebase
 */
export class FireBaseService {
	/**
	 * Returns the auth token and user object 
     * but throws ERROR on unsuccessful attempt
	 */
	public static async logIn(phoneNumber: string): Promise<AuthResponse> {
		const user = await admin.auth().getUserByPhoneNumber(phoneNumber);
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
		const user = await auth.signInWithCustomToken(token);
		if (!user) throw Error();
		return {
			name: user.user.displayName,
			difficulty: 7
		};
    }
	
	/**
	 * Returns the auth token and user object 
     * but throws ERROR on unsuccessful attempt
	 */
	public static async signUp({mobile, password1, password2, name}: SignupData): Promise<AuthResponse> {

		if (password1 !== password2) throw Error();
		
		const user = await admin.auth().createUser({
			phoneNumber: mobile,
			password: password1,
			displayName: name
		});

		const token = await admin.auth().createCustomToken(user.uid);

		// await db.collection("users").doc(user.uid).set({
		// 	username: userName
		// });

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