import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class CreateMagicMoverDto {

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 100, description: 'The maximum weight limit the mover can carry' })
  weightLimit: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 50, description: 'The total magic power of the mover' })
  energy: number;
}
