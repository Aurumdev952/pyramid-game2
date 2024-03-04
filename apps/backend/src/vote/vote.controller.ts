import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthRequest } from '../types';
import { AuthGuard } from '../user/user.guard';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VoteService } from './vote.service';

@UseGuards(AuthGuard)
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.voteService.create(createVoteDto, userId);
  }

  @Post('/many')
  async createMany(
    @Body() createVoteDtos: CreateVoteDto[],
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.id;
    const res = await Promise.all(
      createVoteDtos.map((createVoteDto) =>
        this.voteService.create(createVoteDto, userId),
      ),
    );
    return res;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voteService.findOne(+id);
  }

  @Get('event/:id')
  findAllByEvent(@Param('id') id: string) {
    return this.voteService.findAllByEvent(+id);
  }
}
