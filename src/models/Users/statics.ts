import bcrypt from "bcryptjs";
import {PublicUser, UserInterface} from "./interface";
/**
 * Takes in auth details and returns the user
 * @param email email of user
 * @param password password of user
 */
export const findByCredentials = async function(email: string, password: string): Promise<PublicUser>{
    const user = await this.findOne({ email });
    if (!user) throw new Error("Unable to login");    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)throw new Error("Unable to login");
    return {
        name: user.name,
        difficulty: user.difficulty,
        _id: user._id
    };
};

export const register = async function (data: any): Promise<PublicUser> {
    const user: UserInterface = await this.create(data);
    return {
        _id: user._id,
        name: user.name,
        difficulty: user.difficulty
    };
};
