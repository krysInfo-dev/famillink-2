import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public isTokenExpired(token: string): boolean {
    const expiryTime = this.getExpiryTime(token);
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }

  private getExpiryTime(token: string) {
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.exp : null;
  }

  private decodeToken(token: string) {
    return jwtDecode(token);
  }

}
