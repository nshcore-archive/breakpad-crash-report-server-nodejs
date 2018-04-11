import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CrashReportEntityInterface } from './interfaces/crashReport.entity.interface';

@Entity()
export class CrashReport implements CrashReportEntityInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { nullable: false })
  body: any;

  @Column('bytea', { nullable: false })
  dump: any;

  @Column('boolean', { nullable: false, default: true })
  open: boolean;

  @Column('tsvector', { nullable: true })
  search: string;

  @Column('timestamp with time zone', { nullable: true })
  closedAt: number;

  @Column('timestamp with time zone', { nullable: true, default: new Date() })
  createdAt: number;

  @Column('timestamp with time zone', { nullable: true, default: new Date() })
  updatedAt: number;
}