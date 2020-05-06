export type UserType = "user" | "admin" | "pending-admin-invite";
export type GenderType = "male" | "female";

export const USER_TYPE_USER: UserType = "user";
export const USER_TYPE_ADMIN: UserType = "admin";
export const USER_TYPE_PENDING_ADMIN_INVITE: UserType = "pending-admin-invite";
export const USER_TYPES: UserType[] = ["user", "admin", "pending-admin-invite"];
export const GENDER_TYPES: GenderType[] = ["female", "male"];
export const DEFAULT_GENDER: GenderType = "male";
