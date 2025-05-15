export interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    gender: '男' | '女' | 'その他';
    avatarUrl: string;
    message: string;
}

export interface CreateUserInputWithHash extends Omit<CreateUserInput, 'password'> {
    passwordHash: string;
}
