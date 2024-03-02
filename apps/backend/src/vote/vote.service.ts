import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Event } from '../event/entities/event.entity';
import { User } from '../user/entities/user.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Vote } from './entities/vote.entity';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EntityRepository<Event>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Vote)
    private readonly voteRepository: EntityRepository<Vote>,
    private readonly em: EntityManager,
  ) {}
  async create(createVoteDto: CreateVoteDto, userId: number) {
    // check if user already voted
    const check_event = await this.eventRepository.findOne({
      votes: { user: { id: userId } },
    });
    if (check_event != null) {
      throw new BadRequestException('User already voted');
    }
    const event = await this.eventRepository.findOne({
      id: createVoteDto.event,
    });
    if (event == null) {
      throw new NotFoundException('Event not found');
    }
    const votedFor = await this.userRepository.findOne({
      id: createVoteDto.votedFor,
    });
    if (votedFor == null) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userRepository.findOne({ id: userId });
    if (user == null) {
      throw new NotFoundException('User not found');
    }
    console.log(user, event, votedFor);

    const vote = this.voteRepository.create({
      votedFor,
      user,
      event,
    });
    await this.em.persistAndFlush(vote);
    return vote;
  }

  async findOne(id: number) {
    return await this.voteRepository.findOne({ id });
  }

  async findAllByEvent(eventId: number) {
    return await this.voteRepository.findAll({
      where: { event: { id: eventId } },
      populate: ['user', 'event', 'votedFor'],
    });
  }
}
