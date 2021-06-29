import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserDocument } from '../user/schemas/user.schema';
// '../user/schemas/User.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): { access_token: string } {
    return this.authService.login(req.user as UserDocument);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('register')
  async register(@Req() req: Request): Promise<{ access_token: string }> {
    // console.log('req ', req.body);
    const result = await this.authService.register(req.body as CreateUserDto);
    return result;
    // if (!result.success) {
    //   throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    // }
    // return result;
    // return await this.authService.create(req.user as CreateUserDto);
  }
}
