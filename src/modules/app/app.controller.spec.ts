import { JwtAuthGuard } from '../auth/guards/jwt/jwt.guard';
import { UserCleanWithPassword } from './../user/types/return-user.type';
import { LocalAuthGuard } from '../auth/guards/local/local.guard';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { AuthService } from './../auth/auth.service';
import { UserService } from '@/modules/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { CanActivate } from '@nestjs/common/interfaces';
import { isGuarded } from '../auth/guards/utils-spec/is-guarded';

describe('AppController', () => {
  let appController: AppController;

  const userServiceMock = {
    create: jest.fn((dto) => {
      return { ...dto, roles: ['ghost'] };
    }),
  };
  const authServiceMock = {
    signToken: jest.fn(async () => Promise.resolve('token')),
  };

  const responseMock = {
    cookie: jest.fn(),
    json: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn(),
    getSecretKey: jest.fn(() => 'secret'),
  };

  const AuthGuardMock: CanActivate = { canActivate: jest.fn(() => true) };

  const userLoginMock: CreateUserDto = {
    email: 'example@gmail.com',
    password: '123456789',
  };

  const userLoginAuth: UserCleanWithPassword = {
    ...userLoginMock,
    roles: [UserRole.GHOST],
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue(AuthGuardMock)
      .overrideGuard(JwtAuthGuard)
      .useValue(AuthGuardMock)
      .compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  const commonExpectation = () => {
    expect(responseMock.json).toBeCalledWith({
      email: userLoginMock.email,
    });

    expect(responseMock.cookie).toBeCalledWith('token', 'token', {
      maxAge: 1000 * 60 * 60 * 48,
      httpOnly: true,
    });
  };

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('should create a user', async () => {
      await appController.createUser(userLoginMock, responseMock);

      expect(userServiceMock.create).toHaveBeenCalled();
      commonExpectation();
    });

    it('should return user logined in', async () => {
      await appController.login({ user: userLoginAuth }, responseMock);
      commonExpectation();
    });

    it('should authenticate user using jwt auth route', async () => {
      await appController.getProfile({ user: userLoginAuth }, responseMock);
      commonExpectation();
    });

    it('should have appropriatable guards', async () => {
      expect(isGuarded(AppController.prototype.login, LocalAuthGuard)).toBe(
        true,
      );

      expect(isGuarded(AppController.prototype.getProfile, JwtAuthGuard)).toBe(
        true,
      );
    });
  });
});
