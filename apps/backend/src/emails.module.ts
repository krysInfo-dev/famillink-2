import { DynamicModule, Module } from '@nestjs/common';
import { SetResetPasswordEmailUseCase } from './application/emails/use-cases/set-reset-password-email.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EMailsTemplatePersistanceService } from './infrastructure/emails/persistance/typeorm/repositories/emails-template.persistance.service';
import { EMailsInfrastructureService } from './infrastructure/emails/services/emails-infrastructure.service';
import { LiquidTemplateEngine } from './infrastructure/emails/services/implementations/engines/liquid-template.engine';
import { BrevoProvider } from './infrastructure/emails/services/implementations/providers/brevo.provider';
import { TestProvider } from './infrastructure/emails/services/implementations/providers/test.provider';
import { EMailsTemplateEntity } from './infrastructure/emails/persistance/typeorm/entities/emails-template.entity';
import { CoreModule } from './core.module';
import { EMAILS_INJECTION_TOKENS } from './infrastructure/emails/services/emails.injection-token';
import { EMAILS_TEMPLATE_SERVICE_TOKEN } from './infrastructure/emails/services/interfaces/emails-template.service.token';
import { ConfigProvider } from './domain/core/services/config-provider';
import { EMAILS_SERVICE_TOKEN } from './domain/emails/services/emails-sender.injection-token';

@Module({})
export class EMailsModule {
  static forRoot(): DynamicModule {
    return {
      module: EMailsModule,
      imports: [CoreModule, TypeOrmModule.forFeature([EMailsTemplateEntity])],
      providers: [
        {
          provide: EMAILS_INJECTION_TOKENS.EMAIL_PROVIDER,
          inject: [ConfigProvider],
          useFactory: (configProvider: ConfigProvider) => {
            const provider = configProvider.getString('EMAIL_PROVIDER');
            return provider === 'brevo'
              ? new BrevoProvider(configProvider)
              : new TestProvider();
          },
        },
        {
          provide: EMAILS_INJECTION_TOKENS.TEMPLATE_ENGINE,
          useClass: LiquidTemplateEngine,
        },
        EMailsTemplatePersistanceService,
        {
          provide: EMAILS_INJECTION_TOKENS.TEMPLATE_REPOSITORY,
          useExisting: EMailsTemplatePersistanceService,
        },
        {
          provide: EMAILS_TEMPLATE_SERVICE_TOKEN,
          useExisting: EMailsTemplatePersistanceService,
        },
        EMailsInfrastructureService,
        {
          provide: EMAILS_SERVICE_TOKEN,
          useExisting: EMailsInfrastructureService,
        },
        SetResetPasswordEmailUseCase,
      ],
      exports: [EMailsInfrastructureService, SetResetPasswordEmailUseCase],
    };
  }
}
