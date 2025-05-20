import { ConfigType } from '@nestjs/config';
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  jwt: {
    secret: process.env.JWT_SECRET ?? '',
    signOptions: {
      expiresIn: '1h',
    },
  },
  secret: process.env.JWT_SECRET ?? '',
}));

export type JwtConfig = ConfigType<typeof import('./jwt.config').default>;
