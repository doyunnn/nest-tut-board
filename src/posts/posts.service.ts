import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOneBy({ id });
  }

  async create(postData: Partial<Post>): Promise<Post> {
    const post = this.postRepository.create(postData);
    return this.postRepository.save(post);
  }

  async update(id: number, postData: Partial<Post>): Promise<Post> {
    await this.postRepository.update(id, postData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  async likePost(id: number): Promise<Post> {
    const post = await this.findOne(id);
    post.likes++;
    return this.postRepository.save(post);
  }
}
