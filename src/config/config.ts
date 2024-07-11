import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { MagicItem } from 'src/magic-items/entities/magic-item.entity'
import { MagicMover } from 'src/magic-movers/entities/magic-mover.entity'
import { MissionLog } from 'src/mission-log/entities/mission-log.entity'
dotenv.config({ path: '.env' })


export const typeOrmConfig:TypeOrmModuleOptions = {
    type:'mysql',
    host:process.env.HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username:process.env.USERNAME,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    entities: [MagicItem,MagicMover,MissionLog],
    synchronize: true,
}

export const serverConfig = {
    port: parseInt(process.env.port) || 3000,
  }