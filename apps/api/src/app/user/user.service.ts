import {
  Injectable,
  NotAcceptableException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
// import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log('This action adds a new user');
    try {
      const newItem = new this.userModel(createUserDto);
      const result = await newItem.save();
      return result;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error:
            'could not create user ' +
            createUserDto.email +
            ' because of ' +
            err,
        },
        HttpStatus.NOT_ACCEPTABLE
      );
      // throw new NotAcceptableException(err.errors.name.message);
    }
  }

  async findAll() {
    console.log('This action returns all user');
    const items = await this.userModel.find({});
    // console.log(items);
    return items;
  }
  async findById(id: string) {
    console.log(`This action returns a #${id} user`);

    const foundItem = await this.userModel.findById(id);
    if (foundItem) {
      // console.log(foundItem);
      return foundItem;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'could not find user ' + id,
        },
        HttpStatus.NOT_ACCEPTABLE
      );
    }
  }

  async findOne(id: string) {
    console.log(`This action returns a #${id} user`);

    const foundItem = await this.userModel.findOne({
      email: id?.trim()?.toLowerCase(),
    });
    return foundItem;
    // if (foundItem) {
    //   console.log(foundItem);
    //   return foundItem;
    // } else {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.NOT_ACCEPTABLE,
    //       error: 'could not find user ' + id,
    //     },
    //     HttpStatus.NOT_ACCEPTABLE,
    //   );
    // }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} user`);
    const removedItem = await this.userModel.deleteOne({
      email: id.toLowerCase().trim(),
    });
    if (removedItem.n === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'could not find removed user ' + id,
        },
        HttpStatus.NOT_FOUND
      );
    } else {
      return removedItem;
    }
  }
}
