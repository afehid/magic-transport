import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MagicItemService } from './magic-items.service';
import { MagicItem } from './entities/magic-item.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';

@ApiTags('magic-items')
@Controller('magic-items')
export class MagicItemController {
  constructor(private readonly magicItemService: MagicItemService) {}

  @Get()
  async findAll(): Promise<MagicItem[]> {
    return this.magicItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MagicItem> {
    return this.magicItemService.findOne(+id);
  }

  @ApiOperation({ summary: 'Add a new Item' })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.' })
  @Post()
  async create(@Body() createItemDto: CreateMagicItemDto): Promise<MagicItem> {
    return this.magicItemService.create(createItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.magicItemService.delete(+id);
  }
}
