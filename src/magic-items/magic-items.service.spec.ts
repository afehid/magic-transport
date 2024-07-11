import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagicItemService } from './magic-items.service';
import { MagicItem } from './entities/magic-item.entity';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';

describe('MagicItemService', () => {
  let service: MagicItemService;
  let repository: Repository<MagicItem>;

  const mockMagicItem = {
    id: 1,
    name: 'Test Item',
    weight: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  } as MagicItem;

  const mockRepository = {
    find: jest.fn().mockResolvedValue([mockMagicItem]),
    findOne: jest.fn().mockResolvedValue(mockMagicItem),
    save: jest.fn().mockResolvedValue(mockMagicItem),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MagicItemService,
        {
          provide: getRepositoryToken(MagicItem),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MagicItemService>(MagicItemService);
    repository = module.get<Repository<MagicItem>>(getRepositoryToken(MagicItem));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of magic items', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockMagicItem]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a single magic item', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockMagicItem);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create a new magic item', async () => {
    const createMagicItemDto: CreateMagicItemDto = { name: 'New Item', weight: 20 };
    const result = await service.create(createMagicItemDto);
    expect(result).toEqual(mockMagicItem);
    expect(repository.save).toHaveBeenCalledWith(createMagicItemDto);
  });

  it('should delete a magic item', async () => {
    await service.delete(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
