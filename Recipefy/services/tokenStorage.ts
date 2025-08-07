import * as SecureStore from 'expo-secure-store';

class ToketStorage{
  private TOKEN_KEY:string = 'user_token';

  public async saveToken(token: string) {
    await SecureStore.setItemAsync(this.TOKEN_KEY, token);
  }

  public async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(this.TOKEN_KEY);
  }
  
  public async deleteToken() {
    await SecureStore.deleteItemAsync(this.TOKEN_KEY);
  }
}


export const tokenStorage = new ToketStorage();
