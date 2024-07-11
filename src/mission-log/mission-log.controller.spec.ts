import { Test, TestingModule } from '@nestjs/testing';
import { MissionLogController } from './mission-log.controller';
import { MissionLogService } from './mission-log.service';

describe('MissionLogController', () => {
  let controller: MissionLogController;
  let service: MissionLogService;

  const mockMissionLogService = {
    findMostMissionCompleted: jest.fn().mockResolvedValue([
      { moverId: 1, missionCount: 5 },
      { moverId: 2, missionCount: 3 },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionLogController],
      providers: [
        {
          provide: MissionLogService,
          useValue: mockMissionLogService,
        },
      ],
    }).compile();

    controller = module.get<MissionLogController>(MissionLogController);
    service = module.get<MissionLogService>(MissionLogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of most completed missions', async () => {
    const result = await controller.findMostMissionCompleted();
    expect(result).toEqual([
      { moverId: 1, missionCount: 5 },
      { moverId: 2, missionCount: 3 },
    ]);
    expect(service.findMostMissionCompleted).toHaveBeenCalled();
  });
});
