import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUtilsService {

  public getBaseUrl(baseUrl: string): string {
    console.log('baseUrl', baseUrl);
    console.log('environment.apiBaseUrl', environment.apiBaseUrl);
    console.log('environment.production', environment.production);
    return environment.production ? environment.apiBaseUrl + baseUrl : baseUrl;
  }

  public getInternalApiKey(): string {
    return environment.internalApiKey;
  }

}
