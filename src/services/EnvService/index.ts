import { Envs } from "./interface";
export class EnvService{

    /**
     * Allows the function of doing a callback
     * only in certain envs. For example
     * if you want only to do something in production
     * then use doIn() to implement that functionalitu
     * @param env the env you want to execute in
     * @param cb functionality as call back
     */
    static doIn(env: Envs, cb: () => void) {
        if(process.env.NODE_ENV === env) cb()
    }
}
