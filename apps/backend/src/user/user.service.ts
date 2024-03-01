import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  private readonly SALT = 10;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.em.persistAndFlush(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.findAll({ exclude: ['password'] });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ id: id });
  }
  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.em.removeAndFlush(user);
  }

  async signUp(userData: CreateUserDto) {
    const check_user = await this.userRepository.findOne({
      email: userData.email,
    });

    if (check_user != null) {
      throw new HttpException('User exists already', HttpStatus.FORBIDDEN);
    }
    userData.password = await bcrypt.hash(userData.password, this.SALT);
    const user = await this.create(userData);
    const token = await this.jwtService.signAsync({
      id: user.id,
    });
    return { user, token };
  }
  async signIn(data: LoginDto) {
    const user = await this.findOneByEmail(data.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!bcrypt.compare(data.password, user.password)) {
      throw new HttpException('Password mismatch', HttpStatus.FORBIDDEN);
    }
    const token = await this.jwtService.signAsync({
      id: user.id,
    });

    return { user, token };
  }
}
