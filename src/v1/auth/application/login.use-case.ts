import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtService } from '../infrastructure/jwt.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);

    const token = this.jwtService.generateAccessToken({
      sub: user.id.toString(),
      email: user.email,
    });

    return { accessToken: token };
  }
}
