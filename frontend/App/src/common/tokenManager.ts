//import { secureStorage } from './secureStorage';
import {store} from '../redux/store';

interface TokenState {
  accessToken: string | null;
  accessTokenExpiry: number | null;
}

class TokenManager {

 /*
  private state: TokenState = {
    accessToken: null,
    accessTokenExpiry: null,
  };

 // Store access token in memory
  setAccessToken(token: string, expiresIn: number): void {
    this.state.accessToken = token;
    this.state.accessTokenExpiry = Date.now() + expiresIn * 1000;
  }*/

  // Get current access token
  getAccessToken(): string | null {

    if (this.isAccessTokenExpired()) {
      return null;
    }

    var token = store.getState().auth?.userInfo?.token
    if( token != undefined){
        return token;
    }

    return null;
    
  }

  // Check if access token is expired
  isAccessTokenExpired(): boolean {

    var accessTokenExpiry = store.getState().auth?.userInfo?.accessTokenExpiry;   

    if (!accessTokenExpiry) {
      return true;
    }
    // Add 30-second buffer before expiration
    let timeStamp = Date.parse(accessTokenExpiry);
    return Date.now() >= timeStamp - 30000;
  }
  
   /*
  // Get time until expiration in seconds
  getTimeUntilExpiry(): number {
    if (!this.state.accessTokenExpiry) {
      return 0;
    }
    return Math.max(0, Math.floor((this.state.accessTokenExpiry - Date.now()) / 1000));
  }

  // Clear access token from memory
  clearAccessToken(): void {
    this.state.accessToken = null;
    this.state.accessTokenExpiry = null;
  }

 
  // Store refresh token securely
  async setRefreshToken(token: string): Promise {
    return secureStorage.storeRefreshToken(token);
  }

  // Get refresh token from secure storage
  async getRefreshToken(): Promise {
    return secureStorage.getRefreshToken();
  }

  // Clear all tokens (logout)
  async clearAllTokens(): Promise {
    this.clearAccessToken();
    await secureStorage.clearAllTokens();
  }
  */
}

export const tokenManager = new TokenManager();