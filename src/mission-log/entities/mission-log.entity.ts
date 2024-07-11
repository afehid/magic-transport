import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { MagicMover } from '../../magic-movers/entities/magic-mover.entity';
import { MagicItem } from '../../magic-items/entities/magic-item.entity';

export enum ActionState {
  Loading = 'loading',
  OnMission = 'onMission',
  Done = 'done',
}

@Entity()
export class MissionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ActionState })
  @Column()
  action: ActionState;

  @ManyToOne(() => MagicMover, mover => mover.missionLogs)
  mover: MagicMover;

  @ManyToOne(() => MagicItem, item => item.missionLogs)
  item: MagicItem;

}
