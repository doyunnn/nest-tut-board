import { BoardStatus } from '../boards.entity'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty({ message: '제목을 작성해주세요.' })
  title: string
  description: string
  status: BoardStatus
}
