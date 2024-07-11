import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicMoverModule } from './magic-movers/magic-movers.module';
import { MagicItemModule } from './magic-items/magic-items.module';
import { MissionLogModule } from './mission-log/mission-log.module';
import { typeOrmConfig } from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MagicMoverModule,
    MagicItemModule,
    MissionLogModule,
  ],
})
export class AppModule {}
