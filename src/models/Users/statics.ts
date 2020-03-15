import bcrypt from "bcryptjs";

/**
 * Takes in auth details and returns the user
 * @param email email of user
 * @param password password of user
 */
export const findByCredentials = async function(email: string, password: string){
    const user = await this.findOne({ email });
    if (!user) throw new Error("Unable to login");    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)throw new Error("Unable to login");
    return user;
};
