import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissionLogService } from './mission-log.service';
import { MissionLog } from './entities/mission-log.entity';

describe('MissionLogService', () => {
  let service: MissionLogService;
  let repository: Repository<MissionLog>;

  const mockRepository = {
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockResolvedValue([
        { moverId: 1, missionCount: 5 },
        { moverId: 2, missionCount: 3 },
      ]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MissionLogService,
        {
          provide: getRepositoryToken(MissionLog),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MissionLogService>(MissionLogService);
    repository = module.get<Repository<MissionLog>>(getRepositoryToken(MissionLog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of most completed missions', async () => {
    const result = await service.findMostMissionCompleted();
    expect(result).toEqual([
      { moverId: 1, missionCount: 5 },
      { moverId: 2, missionCount: 3 },
    ]);
    expect(repository.createQueryBuilder).toHaveBeenCalled();
  });
});
