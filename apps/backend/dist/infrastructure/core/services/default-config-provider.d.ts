import { ConfigService } from '@nestjs/config';
import { ConfigProvider } from '../../../domain/core/services/config-provider';
export declare class DefaultConfigProvider implements ConfigProvider {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    getString(key: string): string;
    getNumber(key: string): number;
}
