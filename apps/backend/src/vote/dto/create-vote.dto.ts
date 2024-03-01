import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateVoteDto {
  @IsNotEmpty()
  votedFor: number;

  @IsEmpty()
  user: number;

  @IsNotEmpty()
  event: number;
}
