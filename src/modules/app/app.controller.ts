import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Response,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRoleEnum } from '@prisma/client';

import { Response as ExpressResponse } from 'express';

import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { LocalAuthGuard } from '../auth/guards/local/local.guard';
import { HasRoles } from '../auth/guards/roles/roles.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserCleanNoPassword } from '../user/types/return-user.type';
import { UserService } from '../user/user.service';

@ApiTags('user')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({
    schema: { example: { email: 'example@gmail.com', roles: ['ghost'] } },
  })
  @ApiConsumes('application/json')
  @ApiBadRequestResponse({ description: 'It seems user already existed' })
  async createUser(@Body() user: CreateUserDto, @Response() res) {
    try {
      const newUser = await this.userService.create(user);
      await this.returnUser(newUser, res);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'It seems user already existed',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: err as Error,
        },
      );
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse({
    schema: { example: { email: 'example@gmail.com', roles: ['ghost'] } },
  })
  @ApiConsumes('application/json')
  @ApiUnauthorizedResponse()
  async login(@Request() req, @Response() res) {
    await this.returnUser(req.user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  @ApiBearerAuth('token')
  @ApiOkResponse({
    schema: { example: { email: 'example@gmail.com', roles: ['ghost'] } },
  })
  @ApiUnauthorizedResponse({ description: 'Unautorized' })
  async getProfile(@Request() req, @Response() res) {
    return await this.returnUser(req.user, res);
  }

  private async returnUser(
    user: UserCleanNoPassword,
    @Response() res: ExpressResponse,
  ) {
    const { email, role } = user;

    const token = await this.authService.signToken({
      email,
      role,
    });

    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 48,
      httpOnly: true,
    });

    res.json({ email, role });
  }

  @Post('credentials')
  @HasRoles(UserRoleEnum.GHOST)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async credentials() {
    return 'ok!';
  }
}
