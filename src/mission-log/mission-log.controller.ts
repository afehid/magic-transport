import { Controller, Get } from '@nestjs/common';
import { MissionLogService } from './mission-log.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('mission-logs')
@Controller('mission-logs')
export class MissionLogController {
  constructor(private readonly missionLogService: MissionLogService) {}

  @Get('most-completed')
  async findMostMissionCompleted(): Promise<any[]> {
    return this.missionLogService.findMostMissionCompleted();
  }
}
