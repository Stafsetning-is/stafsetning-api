import { IncomingEvents } from "./interface";

const SESSION_MINS = 5;
export const SESSION_LENGTH = SESSION_MINS * 60 * 1000;
export const TROPHY_EMIT_TIMEOUT_MS = 3750;

export const FINISH_EXERCISE = "finish-exercise";
export const LOG_IN = "log-in";
export const CURRENT_USERS = "current-users";
export const CONNECT = "connect";
export const UPDATE_POINTS = "update-points";
export const NEW_TROPHY = "new-trophy";

export const EVENTS: IncomingEvents[] = ["finish-exercise", "log-in"];
