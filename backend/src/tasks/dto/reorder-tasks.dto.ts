import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty } from 'class-validator';

export class ReorderTasksDto {
  @ApiProperty({
    description: 'Array of task IDs in the desired order',
    example: ['1766220785632', '1766222855366', '1766223439147'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  taskIds: string[];
}
