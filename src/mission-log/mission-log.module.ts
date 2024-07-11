import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionLog } from './entities/mission-log.entity';
import { MissionLogService } from './mission-log.service';
import { MissionLogController } from './mission-log.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MissionLog])],
  providers: [MissionLogService],
  controllers: [MissionLogController],
  exports:[MissionLogService]
})
export class MissionLogModule {}
