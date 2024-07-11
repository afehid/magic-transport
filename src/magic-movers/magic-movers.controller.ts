import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { MagicMoverService } from './magic-movers.service';
import { MagicMover } from './entities/magic-mover.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMagicMoverDto } from './dto/create-magic-mover.dto';
import { LoadItemsDto } from './dto/load-items.dto';

@ApiTags('magic-movers')
@Controller('magic-movers')
export class MagicMoverController {
  constructor(private readonly magicMoverService: MagicMoverService) {}

  @Get()
  async findAll(): Promise<MagicMover[]> {
    return this.magicMoverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MagicMover> {
    return this.magicMoverService.findOne(+id);
  }

  @ApiOperation({ summary: 'Add a new Magic Mover' })
  @ApiResponse({ status: 201, description: 'The magic mover has been successfully created.' })
  @Post()
  async create(@Body() createMoverDto: CreateMagicMoverDto):Promise <MagicMover> {
    return this.magicMoverService.create(createMoverDto);
  }

  @ApiOperation({ summary: 'Load items to a Magic Mover' })
  @ApiResponse({ status: 200, description: 'Items loaded successfully.' })
  @Put(':id/load')
  async loadItems(@Param('id') id: string, @Body() items: LoadItemsDto): Promise<MagicMover> {
    return this.magicMoverService.loadItems(+id, items);
  }

  @ApiOperation({ summary: 'Start a mission to a magic mover' })
  @ApiResponse({ status: 200, description: 'Starts a mission successfully.' })
  @Put(':id/start-mission')
  async startMission(@Param('id') id: string): Promise<MagicMover> {
    return this.magicMoverService.startMission(+id);
  }

  @ApiOperation({ summary: 'End a mission to a magic mover' })
  @ApiResponse({ status: 200, description: 'Ends a mission successfully.' })
  @Put(':id/end-mission')
  async endMission(@Param('id') id: string): Promise<MagicMover> {
    return this.magicMoverService.endMission(+id);
  }
}
