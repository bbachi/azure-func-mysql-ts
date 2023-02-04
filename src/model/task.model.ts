import { Table, Column, Model, HasMany } from 'sequelize-typescript'

@Table
export class Tasks extends Model {
  
  @Column
  name: string

  @Column
  description: string

  @Column
  createdAt?: Date;

  @Column
  updatedAt?: Date

  @Column
  createdBy: string;

  @Column
  updatedBy?: string;
  
}