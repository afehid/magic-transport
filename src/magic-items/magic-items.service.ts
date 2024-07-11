import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MagicItem } from './entities/magic-item.entity';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';

@Injectable()
export class MagicItemService {
  constructor(
    @InjectRepository(MagicItem)
    private magicItemRepository: Repository<MagicItem>,
  ) {}

  async findAll(): Promise<MagicItem[]> {
    return this.magicItemRepository.find();
  }

  async findOne(id: number): Promise<MagicItem> {
    return this.magicItemRepository.findOne({where:{id}});
  }

  async create(magicItem: CreateMagicItemDto): Promise<MagicItem> {
    return this.magicItemRepository.save(magicItem);
  }

  async delete(id: number): Promise<void> {
    await this.magicItemRepository.delete(id);
  }
}
