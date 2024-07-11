import { Test, TestingModule } from '@nestjs/testing';
import { MagicMoverService } from './magic-movers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagicMover, QuestState } from './entities/magic-mover.entity';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
import { LoadItemsDto } from './dto/load-items.dto';
import { BadRequestException } from '@nestjs/common';
import { MissionLog, ActionState } from '../mission-log/entities/mission-log.entity';
import { MagicItem } from '../magic-items/entities/magic-item.entity';

describe('MagicMoverService', () => {
  let service: MagicMoverService;
  let magicMoverRepository: Repository<MagicMover>;
  let magicItemRepository: Repository<MagicItem>;
  let missionLogsRepository: Repository<MissionLog>;

  let result:any = {
    id: 1,
    weightLimit: 100,
    energy: 50,
    questState: QuestState.Resting,
  };

  let createDto: CreateMagicMoverDto = {
    weightLimit: 100,
    energy: 30
  }

  let loadItemsDto: LoadItemsDto = { itemIds: [1, 2, 3] };
  let updatedMover: any = {
    id: 1, questState: QuestState.Loading,
    weightLimit: 50,
    energy: 30,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MagicMoverService,
        {
          provide: getRepositoryToken(MagicMover),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MagicItem),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MissionLog),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MagicMoverService>(MagicMoverService);
    magicMoverRepository = module.get<Repository<MagicMover>>(getRepositoryToken(MagicMover));
    magicItemRepository = module.get<Repository<MagicItem>>(getRepositoryToken(MagicItem));
    missionLogsRepository = module.get<Repository<MissionLog>>(getRepositoryToken(MissionLog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of magic movers', async () => {
      jest.spyOn(magicMoverRepository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a magic mover if found', async () => {
      jest.spyOn(magicMoverRepository, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a magic mover', async () => {
      jest.spyOn(magicMoverRepository, 'save').mockResolvedValue(result);

      expect(await service.create(createDto)).toBe(result);
    });
  });

  describe('loadItems', () => {
    it('should load items to a magic mover if valid', async () => {
      const moverId = 1;
      const loadItemsDto: LoadItemsDto = { itemIds: [1, 2, 3] };
      const items: any = [
        { id: 1, name: 'Item 1', weight: 20 },
        { id: 2, name: 'Item 2', weight: 30 },
        { id: 3, name: 'Item 3', weight: 25 },
      ];
      const missionLogs: any = [];
      const mockMissionLog: any= {
        mover: result,
        item: items[0],
        action: ActionState.Loading
      };
  
      jest.spyOn(magicMoverRepository, 'findOne').mockResolvedValue(result);
      jest.spyOn(magicItemRepository, 'findBy').mockResolvedValue(items);
      jest.spyOn(missionLogsRepository, 'find').mockResolvedValue(missionLogs);
      jest.spyOn(magicMoverRepository, 'save').mockImplementation(async () => result);
      jest.spyOn(missionLogsRepository, 'save').mockImplementation(async () => mockMissionLog);
  
      const loadResult = await service.loadItems(moverId, loadItemsDto);
      expect(loadResult.questState).toBe(QuestState.Loading);
    });

    it('should throw BadRequestException if magic mover not found', async () => {
      const moverId = 999;
      const loadItemsDto: LoadItemsDto = { itemIds: [1, 2, 3] };
      jest.spyOn(magicMoverRepository, 'findOne').mockResolvedValue(null);

      await expect(service.loadItems(moverId, loadItemsDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if weight limit exceeded', async () => {
      const moverId = 1;
      const loadItemsDto: LoadItemsDto = { itemIds: [1, 2, 3] };
      const items: any = [
        { id: 1, name: 'Item 1', weight: 50 },
        { id: 2, name: 'Item 2', weight: 60 },
        { id: 3, name: 'Item 3', weight: 70 },
      ];
      const missionLogs: any = [];
  
      jest.spyOn(magicMoverRepository, 'findOne').mockResolvedValue(result);
      jest.spyOn(magicItemRepository, 'findBy').mockResolvedValue(items);
      jest.spyOn(missionLogsRepository, 'find').mockResolvedValue(missionLogs);
  
      await expect(service.loadItems(moverId, loadItemsDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if items not found', async () => {
      const moverId = 999;
      const loadItemsDto: LoadItemsDto = { itemIds: [1, 2, 3] };

      jest.spyOn(magicMoverRepository, 'findOne').mockResolvedValue(null);

      await expect(service.loadItems(moverId, loadItemsDto)).rejects.toThrow(BadRequestException);
    });

  });

  describe('startMission', () => {
    it('should start a mission for a magic mover', async () => {
      const moverId = 1;

      jest.spyOn(magicMoverRepository, 'findOne').mockResolvedValue(result);
      jest.spyOn(missionLogsRepository, 'find').mockResolvedValue([]);
      jest.spyOn(magicMoverRepository, 'save').mockImplementation(async () => result);

      const startMissionResult = await service.startMission(moverId);
      expect(startMissionResult.questState).toBe(QuestState.OnMission);
    });

    it('should throw BadRequestException if magic mover not found', async () => {
      const moverId = 999;
      jest.spyOn(magicMoverRepository, 'findOne').mockResolvedValue(null);

      await expect(service.startMission(moverId)).rejects.toThrow(BadRequestException);
    });

  });

  describe('endMission', () => {
    it('should end a mission for a magic mover', async () => {
      const moverId = 1;

      jest.spyOn(magicMoverRepository, 'findOne').mockResolvedValue(result);
      jest.spyOn(missionLogsRepository, 'find').mockResolvedValue([]);
      jest.spyOn(magicMoverRepository, 'save').mockImplementation(async () => result);

      const startMissionResult = await service.startMission(moverId);
      expect(startMissionResult.questState).toBe(QuestState.Done);
    });

    it('should throw BadRequestException if magic mover not found', async () => {
      const moverId = 999;
      jest.spyOn(magicMoverRepository, 'findOne').mockResolvedValue(null);

      await expect(service.endMission(moverId)).rejects.toThrow(BadRequestException);
    });

  });

});

