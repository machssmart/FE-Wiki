import { Module } from '@nestjs/common';
import { WikiModule } from './wiki/wiki.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { BaustelleModule } from './baustelle/baustelle.module';

@Module({
  imports: [
    WikiModule,
    AuthModule, 
    FilesModule,
    BaustelleModule
  ],
})
export class AppModule {}