export declare class BcryptService {
    private readonly saltRounds;
    hashPassword(password: string): Promise<string>;
    comparePasswordWithHash(password: string, hash: string): Promise<boolean>;
}
