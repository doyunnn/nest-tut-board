import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './boards.entity'
import { Repository } from 'typeorm'
import { CreateBoardDto } from './dto/create-board.dto'
import { User } from '../auth/user.entity'

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}

  async getAllBoards() {
    return this.boardRepository.find({ order: { id: 'ASC' } })
  }

  async getUserAllBoards(id: string) {
    return this.boardRepository.find({ where: { user: { id } }, order: { id: 'ASC' } })
  }

  async getBoard(id: string) {
    const board = await this.boardRepository.findOneBy({ id })
    if (!board) {
      throw new NotFoundException('Board not found')
    }
    return board
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User) {
    const { title, description, status } = createBoardDto
    const board = this.boardRepository.create({ title, description, status, user })
    await this.boardRepository.save(board)
    return board
  }

  async updateBoard(id: string, createBoardDto: CreateBoardDto) {
    await this.boardRepository.update(id, { ...createBoardDto })
    return this.getBoard(id)
  }

  async deleteBoard(id: string, user: User) {
    return this.boardRepository.delete({ id, user })
  }

  // async likePost(id: number) {
  //   const post = await this.getBoard(id);
  //   post.likes++;
  //   return this.boardRepository.save(post);
  // }
}
