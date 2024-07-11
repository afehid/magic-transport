import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })


export const typeOrmConfig:TypeOrmModuleOptions = {
    type:'mysql',
    host:process.env.HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username:process.env.USERNAME,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
}

export const serverConfig = {
    port: parseInt(process.env.port) || 3000,
  }