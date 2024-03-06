import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty()
  @IsNotEmpty()
  votedFor: number;

  @IsEmpty()
  user: number;

  @ApiProperty()
  @IsNotEmpty()
  event: number;
}
