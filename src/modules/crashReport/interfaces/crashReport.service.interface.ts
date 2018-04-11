import { CrashReportEntityInterface } from './crashReport.entity.interface';

export interface CrashReportServiceInterface {
    findAll(): Promise<CrashReportEntityInterface[]>;

    save(payload: CrashReportEntityInterface): Promise<CrashReportEntityInterface>;

    findOneById(id: number): Promise<CrashReportEntityInterface>;

    updateById(payload: CrashReportEntityInterface, id: number): Promise<void>;

    deleteById(id: number): Promise<void>;
}