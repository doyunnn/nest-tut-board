import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { Exclude } from 'class-transformer'

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

@Entity({
  name: 'BOARDS'
})
export class Board {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsString()
  @IsNotEmpty({ message: '제목을 작성해주세요.' })
  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string

  @IsString()
  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'enum', name: 'board_status', enum: BoardStatus, default: BoardStatus.PUBLIC })
  status: BoardStatus

  @CreateDateColumn({
    type: 'timestamptz'
  })
  createdAt: Date

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
