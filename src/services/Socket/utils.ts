import { IncomingEvents } from "./interface";

const SESSION_MINS = 0.1;

export const SESSION_LENGTH = SESSION_MINS * 60 * 1000;

export const FINISH_EXERCISE = "finish-exercise";
export const LOG_IN = "log-in";
export const CURRENT_USERS = "current-users";
export const CONNECT = "connect";
export const UPDATE_POINTS = "update-points";

export const EVENTS: IncomingEvents[] = ["finish-exercise", "log-in"];
