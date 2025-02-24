import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { AuthCredentialDto } from './dto/auth-credential.dto'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async createUser(authCredentialsDto: AuthCredentialDto) {
    const { username, password } = authCredentialsDto

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    const user = this.userRepository.create({ username, password: passwordHash })

    try {
      await this.userRepository.save(user)
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }

    return user
  }

  async signIn(authCredentialsDto: AuthCredentialDto) {
    const { username, password } = authCredentialsDto
    const user = await this.userRepository.findOneBy({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username }
      const accessToken = await this.jwtService.sign(payload)

      return { ...user, accessToken }
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}
