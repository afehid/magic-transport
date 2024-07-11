import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { MissionLog } from '../../mission-log/entities/mission-log.entity';

@Entity()
export class MagicItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @OneToMany(() => MissionLog, log => log.item)
  missionLogs: MissionLog[];
  
}
