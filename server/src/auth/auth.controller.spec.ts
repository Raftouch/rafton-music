import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
// import { Role } from '@prisma/client';
// import * as escape from 'escape-html';
// import { RegisterDto } from './dto/auth-register.dto';

describe('AuthController - Registration XSS Prevention', () => {
  let authController: AuthController;
  // let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest
              .fn()
              .mockResolvedValue({ id: '1', username: 'testuser' }),
          },
        },
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  // describe('register', () => {
  //   it('should sanitize username to prevent XSS injection', async () => {
  //     const maliciousInput = '<script>alert("XSS")</script>';
  //     const sanitizedUsername = escape(maliciousInput);

  //     const createUserDto: RegisterDto = {
  //       username: maliciousInput,
  //       email: 'test@example.com',
  //       password: 'Test1234!',
  //       role: Role.BASIC,
  //     };

  //     const result = await authController.register(
  //       createUserDto,
  //       {} as any,
  //       {} as any,
  //     );

  //     expect(result.username).toBe(sanitizedUsername);
  //   });

  // it('should sanitize email to prevent XSS injection', async () => {
  //   const maliciousEmail = 'test@exam<script>alert("XSS")</script>ple.com';
  //   const sanitizedEmail = escape(maliciousEmail);

  //   const createUserDto: RegisterDto = {
  //     username: 'testuser',
  //     email: maliciousEmail,
  //     password: 'Test1234!',
  //     role: Role.BASIC,
  //   };

  //   const result = await authController.register(createUserDto, {} as any, {} as any);

  //   expect(result.email).toBe(sanitizedEmail);
  // });
  // });
});
