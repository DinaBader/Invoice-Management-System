import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private accessToken: string;

  async getToken() {
    if (!this.accessToken) {
      await this.fetchToken();
    }
    return this.accessToken;
  }

  private async fetchToken() {
    const keycloakUrl = 'http://localhost:8080'; 
    const realm = 'invoice-management-system'; 
    const clientId = 'users';
    const clientSecret = 'OrRuPikDIxLX3yXfVjRSW3Ugmx1U8TUq'; 

    try {
      const response = await axios.post(
        `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.accessToken = response.data.access_token;
    } catch (error) {
      throw new Error('Failed to obtain Keycloak token: ' + error.message);
    }
  }
}
