export interface SignUpData {
    name: string;
    email: string;
    phone: string;
    password: string;

}
export interface SignInData {
    email: string;
    password: string;
}

export type AuthTokenPayload = {
  userId: string;
  sessionID: string;
};

export type EmailVerification = {
     exists: boolean;
      message: string; 
    };
