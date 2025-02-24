import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialDto } from './dto/auth-credential.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialDto) {
    return this.authService.createUser(authCredentialsDto)
  }

  @Post('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialDto) {
    return this.authService.signIn(authCredentialsDto)
  }
}
