import { Test, TestingModule } from '@nestjs/testing';
import { MagicMoverController } from './magic-movers.controller';
import { MagicMoverService } from './magic-movers.service';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
import { LoadItemsDto } from './dto/load-items.dto';
import { MagicMover, QuestState } from './entities/magic-mover.entity';
import { BadRequestException } from '@nestjs/common';

describe('MagicMoverController', () => {
  let controller: MagicMoverController;
  let service: MagicMoverService;

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
      controllers: [MagicMoverController],
      providers: [
        {
          provide: MagicMoverService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            loadItems: jest.fn(),
            startMission: jest.fn(),
            endMission: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MagicMoverController>(MagicMoverController);
    service = module.get<MagicMoverService>(MagicMoverService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of magic movers', async () => {

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a magic mover if found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(result);
  
      expect(await controller.findOne('1')).toBe(result);
    });
  
    it('should throw BadRequestException if magic mover not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new BadRequestException());
  
      await expect(controller.findOne('999')).rejects.toThrow(BadRequestException);
    });
  });
  

  describe('create', () => {
    it('should create a magic mover', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createDto)).toBe(result);
    });
  });

  describe('loadItems', () => {
    it('should load items to a magic mover', async () => {
      const moverId = '1';

      jest.spyOn(service, 'loadItems').mockResolvedValue(updatedMover);

      expect(await controller.loadItems(moverId, loadItemsDto)).toBe(updatedMover);
    });

    it('should throw BadRequestException if magic mover not found', async () => {
      const moverId = '999';
      const loadItemsDto: LoadItemsDto = { itemIds: [1, 2, 3] };
      jest.spyOn(service, 'loadItems').mockRejectedValue(new BadRequestException());

      await expect(controller.loadItems(moverId, loadItemsDto)).rejects.toThrow(BadRequestException);
    });

  });

  describe('startMission', () => {
    it('should start a mission for a magic mover', async () => {
      const moverId = '1';
      jest.spyOn(service, 'startMission').mockResolvedValue(updatedMover);

      expect(await controller.startMission(moverId)).toBe(updatedMover);
    });

    it('should throw BadRequestException if magic mover not found', async () => {
      const moverId = '999';
      jest.spyOn(service, 'startMission').mockRejectedValue(new BadRequestException());

      await expect(controller.startMission(moverId)).rejects.toThrow(BadRequestException);
    });
  });

  describe('endMission', () => {
    it('should end a mission for a magic mover', async () => {
      const moverId = '1';
      jest.spyOn(service, 'endMission').mockResolvedValue(updatedMover);

      expect(await controller.endMission(moverId)).toBe(updatedMover);
    });

    it('should throw BadRequestException if magic mover not found', async () => {
      const moverId = '999';
      jest.spyOn(service, 'endMission').mockRejectedValue(new BadRequestException());

      await expect(controller.endMission(moverId)).rejects.toThrow(BadRequestException);
    });
  });
});
