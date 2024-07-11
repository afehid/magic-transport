import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionLog } from './entities/mission-log.entity';

@Injectable()
export class MissionLogService {
  constructor(
    @InjectRepository(MissionLog)
    private missionLogRepository: Repository<MissionLog>,
  ) {}

  async findMostMissionCompleted(): Promise<any[]> {
    return this.missionLogRepository
      .createQueryBuilder('log')
      .select('log.moverId, COUNT(log.id) AS missionCount')
      .where('log.action = :action', { action: 'done' })
      .groupBy('log.moverId')
      .orderBy('missionCount', 'DESC')
      .getRawMany();
  }
}
