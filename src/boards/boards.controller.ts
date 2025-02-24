import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '../common/decorators/user.decorators'
import { User } from '../auth/user.entity'

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getAllBoards() {
    return this.boardsService.getAllBoards()
  }

  @Get('/user/:id')
  @UseGuards(AuthGuard())
  async getUserAllBoards(@Param('id') id: string) {
    return this.boardsService.getUserAllBoards(id)
  }

  @Get(':id')
  async getBoard(@Param('id') id: string) {
    return this.boardsService.getBoard(id)
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBoard(@Body() createBoardDto: CreateBoardDto, @CurrentUser() user: User) {
    return this.boardsService.createBoard(createBoardDto, user)
  }

  @Put(':id')
  async updateBoard(@Param('id', BoardStatusValidationPipe) id: string, @Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.updateBoard(id, createBoardDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteBoard(@Param('id') id: string, @CurrentUser() user: User) {
    return this.boardsService.deleteBoard(id, user)
  }
}
