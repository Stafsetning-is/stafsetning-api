export interface UserInterface {
    difficulty: number;
    name: string;
}

export interface PrivateUserInterface extends UserInterface  {
    id: string;
}