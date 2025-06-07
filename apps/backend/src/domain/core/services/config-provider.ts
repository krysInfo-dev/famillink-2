export abstract class ConfigProvider {
  abstract getString(key: string): string;
  abstract getNumber(key: string): number;
}
