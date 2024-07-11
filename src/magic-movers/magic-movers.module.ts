import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicMover } from './entities/magic-mover.entity';
import { MagicMoverService } from './magic-movers.service';
import { MagicMoverController } from './magic-movers.controller';
import { MagicItem } from '../magic-items/entities/magic-item.entity';
import { MissionLog } from '../mission-log/entities/mission-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MagicMover,MagicItem,MissionLog])],
  providers: [MagicMoverService],
  controllers: [MagicMoverController],
})
export class MagicMoverModule {}
