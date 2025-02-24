import { Module } from '@nestjs/common'
import { PostsModule } from './posts/posts.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PostsModule, BoardsModule, AuthModule]
})
export class AppModule {}
