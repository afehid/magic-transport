import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicMoverModule } from './magic-movers/magic-movers.module';
import { MagicItemModule } from './magic-items/magic-items.module';
import { MissionLogModule } from './mission-log/mission-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'zeroxcool007',
      database: 'transport',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MagicMoverModule,
    MagicItemModule,
    MissionLogModule,
  ],
})
export class AppModule {}
