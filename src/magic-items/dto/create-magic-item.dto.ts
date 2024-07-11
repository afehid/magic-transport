import { ApiProperty } from '@nestjs/swagger';

export class CreateMagicItemDto {
  @ApiProperty({ example: 'Magic Wand', description: 'The name of the magic item' })
  name: string;

  @ApiProperty({ example: 10, description: 'The weight of the magic item' })
  weight: number;
}
