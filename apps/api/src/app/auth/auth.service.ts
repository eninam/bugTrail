import {
  Injectable,
  HttpStatus,
  HttpException,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import passport from 'passport';
import { User, UserDocument } from '../user/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'the user with that email is not found',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: UserDocument): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user._id,
    };
    // console.log('in login ', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(createUserDto: CreateUserDto) {
    console.log(
      'email ',
      createUserDto?.email,
      ' pass ',
      createUserDto.password
    );
    let status = {
      email: createUserDto?.email || 'hel@gmail.com ',
      success: true,
      message: 'user registered',
    };
    const user = await this.userService.findOne(createUserDto?.email);
    if (!user) {
      try {
        await this.userService.create(createUserDto);
      } catch (err) {
        status = {
          email: createUserDto?.email,
          success: false,
          message: err,
        };
      }
      return {
        access_token: this.jwtService.sign(status),
      };
    }
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'the email you are trying to use already has an account',
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  // async create(createUserDto: CreateUserDto) {
  //   console.log('in create ', createUserDto);
  //   // const { email, name, password } = createUserDto;
  //   const user = await this.userService.create(createUserDto);
  //   console.log('in created user ', user);
  //   return this.login(user);
  // }

  async verify(token: string): Promise<UserDocument> {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get('jwtSecret'),
    });
    const user = await this.userService.findOne(decoded.email);
    return user;
  }
}
