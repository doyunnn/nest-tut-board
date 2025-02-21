import { Controller, Get, Post, Put, Delete, Param, Body, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async getPost(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Post()
  async createPost(@Body() postData: Partial<PostEntity>): Promise<PostEntity> {
    return this.postsService.create(postData);
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() postData: Partial<PostEntity>): Promise<PostEntity> {
    return this.postsService.update(id, postData);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<void> {
    return this.postsService.delete(id);
  }

  @Patch(':id/like')
  async likePost(@Param('id') id: number): Promise<PostEntity> {
    return this.postsService.likePost(id);
  }
}
