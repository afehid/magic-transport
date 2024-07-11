import { ApiProperty } from '@nestjs/swagger';

export class LoadItemsDto {
  @ApiProperty({ example: [1, 2], description: 'List of item IDs to load' })
  itemIds: number[];
}
