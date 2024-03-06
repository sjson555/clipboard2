import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clipboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;
}
