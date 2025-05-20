import {
  Request,
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { LoginUseCase } from '../application/login.use-case';
import { JwtAuthGuard } from '../../../guards/wt-auth.guard';
import { UserProfile } from '../domain/user-profile.interface';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener información del usuario autenticado' })
  getProfile(@Request() req: UserProfile) {
    return req.user;
  }
}
