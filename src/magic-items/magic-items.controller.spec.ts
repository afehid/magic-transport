import { Test, TestingModule } from '@nestjs/testing';
import { MagicItemController } from './magic-items.controller';
import { MagicItemService } from './magic-items.service';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { MagicItem } from './entities/magic-item.entity';

describe('MagicItemController', () => {
  let controller: MagicItemController;
  let service: MagicItemService;

  const mockMagicItem = {
    id: 1,
    name: 'Test Item',
    weight: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  } as MagicItem;

  const mockMagicItemService = {
    findAll: jest.fn().mockResolvedValue([mockMagicItem]),
    findOne: jest.fn().mockResolvedValue(mockMagicItem),
    create: jest.fn().mockResolvedValue(mockMagicItem),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagicItemController],
      providers: [
        {
          provide: MagicItemService,
          useValue: mockMagicItemService,
        },
      ],
    }).compile();

    controller = module.get<MagicItemController>(MagicItemController);
    service = module.get<MagicItemService>(MagicItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of magic items', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockMagicItem]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single magic item', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockMagicItem);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a new magic item', async () => {
    const createMagicItemDto: CreateMagicItemDto = { name: 'New Item', weight: 20 };
    const result = await controller.create(createMagicItemDto);
    expect(result).toEqual(mockMagicItem);
    expect(service.create).toHaveBeenCalledWith(createMagicItemDto);
  });

  it('should delete a magic item', async () => {
    await controller.delete('1');
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
