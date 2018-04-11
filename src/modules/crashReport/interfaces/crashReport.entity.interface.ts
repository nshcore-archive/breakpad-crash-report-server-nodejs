export interface CrashReportEntityInterface {
    readonly id: number;
    readonly body: any;
    readonly dump: any;
    readonly open: boolean;
    readonly search: string;
    readonly closedAt: number;
    readonly createdAt: number;
    readonly updatedAt: number;
}
