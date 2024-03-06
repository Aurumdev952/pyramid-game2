import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  private readonly fork: EntityManager;
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EntityRepository<Event>,
    private readonly em: EntityManager,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.fork = em.fork();
  }
  async create(createEventDto: CreateEventDto) {
    const event = this.eventRepository.create(createEventDto);
    await this.em.persistAndFlush(event);
    return event;
  }

  async findAll() {
    return await this.eventRepository.findAll({
      populate: ['votes', 'votes.user', 'votes.votedFor'],
      exclude: ['votes.user.password', 'votes.votedFor.password'],
    });
  }

  async findOne(id: number) {
    return await this.eventRepository.findOne({ id: id });
  }

  // @Cron('0 15 * * */1') // prod
  // @Cron('*/5 * * * * *') // stage
  @Cron('*/5 * * * *') // test
  async handleCron() {
    const time = Date.now();
    this.logger.log('creating event at ' + time);
    const n = await this.fork.count(Event);
    const event = this.fork.create(Event, {
      name: 'Vote No ' + (n + 1),
    });
    await this.fork.persistAndFlush(event);
    const callback = async () => {
      this.logger.log(`closing event ${event.name}`);
      event.isClosed = true;
      event.dateEnded = new Date();
      await this.fork.persistAndFlush(event);
    };
    // 60000, // 3600000 prod,
    const timeout = setTimeout(callback, 500000);
    this.schedulerRegistry.addTimeout('close event ' + event.id, timeout);
  }
}
