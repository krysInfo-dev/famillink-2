/**
 * Abstract class for a configuration provider.
 * This class defines the interface for retrieving configuration values.
 */
export abstract class ConfigProvider {
  /**
   * Gets a configuration value as a string.
   * @param {string} key - The configuration key.
   * @returns {string} The configuration value.
   */
  abstract getString(key: string): string;
  /**
   * Gets a configuration value as a number.
   * @param {string} key - The configuration key.
   * @returns {number} The configuration value.
   */
  abstract getNumber(key: string): number;
}
