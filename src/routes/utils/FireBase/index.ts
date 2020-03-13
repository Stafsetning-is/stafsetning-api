import { UserInterface } from "../../../models";
import { Token, AuthResponse, SignupData } from "./interface";
const PLACE_HOLDER_TOKEN = "3agf3r2456siw0a9w2riutu";
const TEMP_USER = {
	difficulty: 7,
	id: "5",
	name: "Jón Sigurðsson"
};

/**
 * Class encapsulates the logic
 * that concernes working with firebase
 *
 */
export class FireBaseService {
	/**
	 * Returns the auth token and user object 
     * but throws ERROR on unsuccessful attempt
	 */
	public static async logIn(
		username: string,
		password: string
	): Promise<AuthResponse> {
        return {
            token: PLACE_HOLDER_TOKEN,
            user: TEMP_USER
        };
	}

	/**
	 * Returns the user from its auth token
	 * throws error if no user found
	 * @param token user token
	 */
	public static async getUserFromToken(token: Token): Promise<UserInterface> {
		const user = TEMP_USER;
		if (!user) throw Error();
		return user;
    }
	
	/**
	 * Returns the auth token and user object 
     * but throws ERROR on unsuccessful attempt
	 */
	public static async signUp(data: SignupData): Promise<AuthResponse> {
		/**
		 * 
		 */
        return {
            token: PLACE_HOLDER_TOKEN,
            user: TEMP_USER
        };

	}


}
