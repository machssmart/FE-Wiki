// auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }

  @Post('logout')
  async logout() {
    return { success: true, message: 'Logout erfolgreich' };
  }
}

// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'editor' | 'customer';
  createdAt: Date;
}

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      email: 'admin@fockenbrock.de',
      password: '$2b$10$rQJ8vQ8vQ8vQ8vQ8vQ8vQO', // admin123
      name: 'Thomas Fockenbrock',
      role: 'admin',
      createdAt: new Date('2025-01-01'),
    },
    {
      id: 2,
      email: 'editor@fockenbrock.de', 
      password: '$2b$10$rQJ8vQ8vQ8vQ8vQ8vQ8vQO', // editor123
      name: 'Mike Schmidt',
      role: 'editor',
      createdAt: new Date('2025-01-15'),
    },
    {
      id: 3,
      email: 'kunde@beispiel.de',
      password: '$2b$10$rQJ8vQ8vQ8vQ8vQ8vQ8vQO', // kunde123
      name: 'Max Mustermann', 
      role: 'customer',
      createdAt: new Date('2025-02-01'),
    },
  ];

  constructor(private jwtService: JwtService) {
    this.initializePasswords();
  }

  private async initializePasswords() {
    for (const user of this.users) {
      if (user.email === 'admin@fockenbrock.de') {
        user.password = await bcrypt.hash('admin123', 10);
      } else if (user.email === 'editor@fockenbrock.de') {
        user.password = await bcrypt.hash('editor123', 10);
      } else {
        user.password = await bcrypt.hash('kunde123', 10);
      }
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find(u => u.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Ungültige Anmeldedaten');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      success: true,
      message: 'Login erfolgreich',
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async getProfile(userId: number) {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new UnauthorizedException('Benutzer nicht gefunden');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
    };
  }

  getAllUsers() {
    return this.users.map(({ password, ...user }) => user);
  }
}

// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'fockenbrock_elektrotechnik_2025_geheim', // In Produktion: process.env.JWT_SECRET
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}

// dto/login.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'fockenbrock_elektrotechnik_2025_geheim',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

// jwt-auth.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}

// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}