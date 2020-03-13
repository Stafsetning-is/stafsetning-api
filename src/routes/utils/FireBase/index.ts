// import { UserInterface } from "../../../models";
// import { Token, AuthResponse, SignupData } from "./interface";
import { FB_SERVICEACCOUNT_KEY } from "../../../util/secrets";
import "firebase/auth";
import "firebase/firestore";
import * as admin from "firebase-admin";
import { app } from "../../../../src/auth";

// const PLACE_HOLDER_TOKEN = "3agf3r2456siw0a9w2riutu";
// const TEMP_USER = {
// 	difficulty: 7,
// 	id: "5",
// 	name: "Jón Sigurðsson"
// };

admin.initializeApp({
    credential: admin.credential.cert(FB_SERVICEACCOUNT_KEY)
});

//const auth = app.auth();
const db = app.firestore();

const createUser = async(username: string, mobile: string, password: string) => {
	const user = await admin.auth().createUser({
		phoneNumber: mobile,
		password: password,
	});
	await db.collection("users").doc(user.uid).set({
		username: username
	});
};

createUser("gabriels17", "+3546180021", "test1234");


// const signIn = async(uid: string) => {
// 	const customToken = admin.auth().createCustomToken(uid)
// 		.then(cred => {
// 			return db.collection("users").doc(cred.user.uid)
// 		})
// 	await auth.signInWithCustomToken(customToken);
// 	//console.log(user); 
// };


/**
 * Class encapsulates the logic
 * that concernes working with firebase
 *
 */
//export class FireBaseService {
	/**
	 * Returns the auth token and user object 
     * but throws ERROR on unsuccessful attempt
	 */
	// public static async logIn(
	// 	username: string,
	// 	password: string
	// ): Promise<AuthResponse> {
    //     return {
    //         token: PLACE_HOLDER_TOKEN,
    //         user: TEMP_USER
    //     };
	// }


	/**
	 * Returns the user from its auth token
	 * throws error if no user found
	 * @param token user token
	 */
	// public static async getUserFromToken(token: Token): Promise<UserInterface> {
	// 	const user = TEMP_USER;
	// 	if (!user) throw Error();
	// 	return user;
    // }
	
	/**
	 * Returns the auth token and user object 
     * but throws ERROR on unsuccessful attempt
	 */
	// public static async signUp(data: SignupData): Promise<AuthResponse> {

    //     return {
    //         token: PLACE_HOLDER_TOKEN,
    //         user: TEMP_USER
    //     };

	// }


//}