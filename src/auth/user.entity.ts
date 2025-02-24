import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { IsUUID } from 'class-validator'
import { Exclude } from 'class-transformer'
import { Board } from '../boards/boards.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[]
}
