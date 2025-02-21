import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getAllBoards() {
    return this.boardsService.getAllBoards()
  }

  @Get(':id')
  async getBoard(@Param('id') id: string) {
    return this.boardsService.getBoard(id)
  }

  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto)
  }

  @Put(':id')
  async updateBoard(@Param('id') id: string, @Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.updateBoard(id, createBoardDto)
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string) {
    return this.boardsService.deleteBoard(id)
  }
}
