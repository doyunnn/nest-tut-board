import { Module } from '@nestjs/common'
import { PostsModule } from './posts/posts.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PostsModule, BoardsModule]
})
export class AppModule {}
