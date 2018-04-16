import { Repository } from 'typeorm';
import { Component, Inject } from '@nestjs/common';
import { CrashReport } from './crashReport.entity';
import { CrashReportServiceInterface } from './interfaces/crashReport.service.interface';

@Component()
export class CrashReportService implements CrashReportServiceInterface {

  /**
   * @param crashReportRepository
   */
  constructor(
    @Inject('CrashReportRepositoryToken') private readonly crashReportRepository: Repository<CrashReport>) {}

    async findAll(): Promise<CrashReport[]> {
      return await this.crashReportRepository.find();
    }

    /**
     * @param payload
     */
    async save(payload: CrashReport): Promise<CrashReport> {
      return await this.crashReportRepository.save(payload);
    }

    /**
     * @param id
     */
    async findOneById(id: number): Promise<CrashReport> {
      return await this.crashReportRepository.findOneById(id);
    }

    /**
     * @param payload
     * @param id
     */
    async updateById(payload: CrashReport, id: number): Promise<void> {
      return await this.crashReportRepository.updateById(id, payload);
    }

    /**
     * @param id
     */
    async deleteById(id: number): Promise<void> {
      return await this.crashReportRepository.deleteById(id);
    }
}