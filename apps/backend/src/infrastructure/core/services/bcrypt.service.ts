import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Service for handling bcrypt hashing and comparison.
 */
@Injectable()
export class BcryptService {
  /**
   * The number of salt rounds to use for hashing.
   * @private
   */
  private readonly saltRounds = 12; // You can adjust this value

  /**
   * Hashes a password using bcrypt.
   * @param {string} password - The plain text password.
   * @returns {Promise<string>} A promise that resolves to the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compares a plain text password with a hash.
   * @param {string} password - The plain text password.
   * @param {string} hash - The hashed password to compare against.
   * @returns {Promise<boolean>} A promise that resolves to true if the password matches the hash, false otherwise.
   */
  async comparePasswordWithHash(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
