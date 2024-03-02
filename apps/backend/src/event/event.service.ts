import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EntityRepository<Event>,
    private readonly em: EntityManager,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    await this.em.persistAndFlush(event);
    return event;
  }

  async findAll() {
    return await this.eventRepository.findAll({
      populate: ['votes', 'votes.user', 'votes.votedFor'],
    });
  }

  async findOne(id: number) {
    return await this.eventRepository.findOne({ id: id });
  }
}
