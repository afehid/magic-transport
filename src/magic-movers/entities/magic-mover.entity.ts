import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { MissionLog } from '../../mission-log/entities/mission-log.entity';

export enum QuestState {
  Resting = 'resting',
  Loading = 'loading',
  OnMission = 'onMission',
  Done = 'done',
}


@Entity()
export class MagicMover {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weightLimit: number;

  @Column()
  energy: number;

  @Column({ type: 'enum', enum: QuestState, default: QuestState.Resting })
  questState: QuestState;

  @OneToMany(() => MissionLog, missionLog => missionLog.mover)
  missionLogs: MissionLog[];
  
}
