import { IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { Exclude } from 'class-transformer'

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9]*$/, { message: 'password only accepts english and number' }) // english + number
  password: string
}
