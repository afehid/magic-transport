import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MagicMover, QuestState } from '../magic-movers/entities/magic-mover.entity';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
import { LoadItemsDto } from './dto/load-items.dto';
import { MagicItem } from '../magic-items/entities/magic-item.entity';
import { ActionState, MissionLog } from '../mission-log/entities/mission-log.entity';

@Injectable()
export class MagicMoverService {
  constructor(
    @InjectRepository(MagicMover)
    private magicMoverRepository: Repository<MagicMover>,
    @InjectRepository(MagicItem)
    private magicItemRepository: Repository<MagicItem>,
    @InjectRepository(MissionLog)
    private missionLogsRepository: Repository<MissionLog>,
  ) {}

  async findAll(): Promise<MagicMover[]> {
    return this.magicMoverRepository.find();
  }

  async findOne(id: number): Promise<MagicMover> {
    const magicMover = await this.magicMoverRepository.findOne({ where: { id } });
    if (!magicMover) {
      throw new BadRequestException(`Magic Mover with ID ${id} not found.`);
    }
    return magicMover;
  }

  async create(magicMover: CreateMagicMoverDto): Promise<MagicMover> {
    return this.magicMoverRepository.save(magicMover);
  }

  async loadItems(moverId: number, loadItemsDto: LoadItemsDto): Promise<MagicMover> {
    const mover = await this.magicMoverRepository.findOne({
      where: { id: moverId }
    });
  
    if (!mover) {
      throw new BadRequestException(`Magic Mover with ID ${moverId} not found.`);
    }
  
    if (mover.questState === QuestState.OnMission) {
      throw new BadRequestException('Cannot load items while on a mission');
    }
  
    const missionLogs = await this.missionLogsRepository.find({ where: { mover: mover, action: ActionState.Loading }, relations: { item: true } });
  
    const itemsToLoad = await this.magicItemRepository.findBy({ id: In(loadItemsDto.itemIds) });
  
    if (itemsToLoad.length < 1) {
      throw new BadRequestException('Cannot find the specified items');
    }
  
    const totalWeight = itemsToLoad.reduce((sum, item) => sum + item.weight, 0);
    const currentWeight = missionLogs.reduce((sum, log) => sum + (log.item?.weight || 0), 0);
  
    if (totalWeight + currentWeight > mover.weightLimit) {
      throw new BadRequestException('Weight limit exceeded');
    }
  
    for (const item of itemsToLoad) {
      const missionLog = new MissionLog();
      missionLog.mover = mover;
      missionLog.item = item;
      missionLog.action = ActionState.Loading;
      await this.missionLogsRepository.save(missionLog);
    }
  
    mover.questState = QuestState.Loading;
    return this.magicMoverRepository.save(mover);
  }
  

  async startMission(moverId: number): Promise<MagicMover> {
    const mover = await this.magicMoverRepository.findOne({where:{id:moverId}});
    if (!mover) {
      throw new BadRequestException(`Magic Mover with ID ${moverId} not found.`);
    }
    const missionLogs = await this.missionLogsRepository.find({ where: { mover: mover , action:ActionState.Loading }, relations: { item: true } });
    
    for (const missionLog of missionLogs) {
      missionLog.action = ActionState.OnMission;
      await this.missionLogsRepository.save(missionLog);
    }
    mover.questState = QuestState.OnMission;
    return this.magicMoverRepository.save(mover);
  }

  async endMission(moverId: number): Promise<MagicMover> {
    const mover = await this.magicMoverRepository.findOne({where:{id:moverId}});
    if (!mover) {
      throw new BadRequestException(`Magic Mover with ID ${moverId} not found.`);
    }

    const missionLogs = await this.missionLogsRepository.find({ where: { mover: mover,action:ActionState.OnMission }, relations: { item: true } });

    for (const missionLog of missionLogs) {
      missionLog.action = ActionState.Done;
      await this.missionLogsRepository.save(missionLog);
    }

    mover.questState = QuestState.Done;
    return this.magicMoverRepository.save(mover);
  }
}
