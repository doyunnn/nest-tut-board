import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { BoardStatus } from '../boards.entity'

export class BoardStatusValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase()

    if (value !== BoardStatus.PUBLIC && value !== BoardStatus.PRIVATE) {
      throw new BadRequestException(`${value} is an invalid status`)
    }
    return value
  }
}
