export interface UserProfile {
  user: {
    id: number;
    email: string;
    username: string;
    nombreCompleto: string;
    rol: string;
  };
}

export interface JwtPayload extends UserProfile {
  iat: number;
  exp: number;
}
