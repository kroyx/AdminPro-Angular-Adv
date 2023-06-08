export interface GoogleSigninResponse {
  ok: boolean;
  email?: string;
  name?: string;
  picture?: string;
  token?: string;
}