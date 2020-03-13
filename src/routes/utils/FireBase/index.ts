import {UserInterface} from "../../../models"
type Token = string;
const PLACE_HOLDER_TOKEN = "3agf3r2456siw0a9w2riutu";
const TEMP_USER = {
    difficulty: 7,
    id: "5"
};

/**
 * Class encapsulates the logic
 * that concernes working with firebase
 * 
 */
export class FireBaseService {

    /**
     * Returns the auth token for given username and password
     */
    public static async getAuthToken(username: string, password: string): Promise<Token>{
        return PLACE_HOLDER_TOKEN;
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


}