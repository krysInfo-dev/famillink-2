import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10; // Vous pouvez ajuster cette valeur

  /**
   * Hashes a password using bcrypt.
   * @param password The plain text password.
   * @returns A promise that resolves to the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compares a plain text password with a hash.
   * @param password The plain text password.
   * @param hash The hashed password to compare against.
   * @returns A promise that resolves to true if the password matches the hash, false otherwise.
   */
  async comparePasswordWithHash(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
