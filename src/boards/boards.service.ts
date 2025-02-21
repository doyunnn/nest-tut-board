import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './boards.entity'
import { Repository } from 'typeorm'
import { CreateBoardDto } from './dto/create-board.dto'

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}

  async getAllBoards() {
    return this.boardRepository.find({ order: { id: 'ASC' } })
  }

  async getBoard(id: string) {
    const board = await this.boardRepository.findOneBy({ id })
    if (!board) {
      throw new NotFoundException('Board not found')
    }
    return board
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const board = this.boardRepository.create({ ...createBoardDto })
    return this.boardRepository.save(board)
  }

  async updateBoard(id: string, createBoardDto: CreateBoardDto) {
    await this.boardRepository.update(id, { ...createBoardDto })
    return this.getBoard(id)
  }

  async deleteBoard(id: string) {
    return this.boardRepository.delete(id)
  }

  // async likePost(id: number) {
  //   const post = await this.getBoard(id);
  //   post.likes++;
  //   return this.boardRepository.save(post);
  // }
}
