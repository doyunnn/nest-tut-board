import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Post } from '../posts/post.entity'
import 'dotenv/config'
import { Board } from '../boards/boards.entity'
import * as process from 'node:process'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'board',
  entities: [__dirname + '/../**/*.entity.{js,ts}', Post, Board],
  synchronize: true // 개발 환경에서는 true, 운영 환경에서는 false
}
