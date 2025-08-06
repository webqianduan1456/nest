import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../User/User.module';
import { UniappUserModule } from '../Uniapp/Uniapp-user/UniappUser.module';
import { LocalStrategyUniapp } from './UniappLocal.strategy';

@Module({
  imports: [UserModule, UniappUserModule, PassportModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, LocalStrategyUniapp],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
