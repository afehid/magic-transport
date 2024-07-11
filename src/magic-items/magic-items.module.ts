import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicItem } from './entities/magic-item.entity';
import { MagicItemService } from './magic-items.service';
import { MagicItemController } from './magic-items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MagicItem])],
  providers: [MagicItemService],
  controllers: [MagicItemController],
  exports: [MagicItemService],
})
export class MagicItemModule {}
