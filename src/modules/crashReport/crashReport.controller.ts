import { CrashReportService } from './crashReport.service';
import { CreateCrashReportDto } from './dto/create-crashReport.dto';
import { ResourceControllerInterface } from '../../common/interfaces/resource.controller.interface';
import { Get, Post, Patch, Delete, Controller, Body, Param, Res, HttpStatus, HttpException } from '@nestjs/common';

@Controller('report')
export class CrashReportController implements ResourceControllerInterface {

  /**
   * @param CrashReportService
   */
  constructor(private readonly CrashReportService: CrashReportService) {}

  @Get()
	async index(): Promise<object> {
    const collection = await this.CrashReportService.findAll();
    return collection;
  }

  /**
   * @param CreateCrashReportDto
   */
  @Post()
  async create(@Body() CreateCrashReportDto: CreateCrashReportDto): Promise<object> {
    const entity = await this.CrashReportService.save(CreateCrashReportDto);
    return { reportId: entity.id };
  }

  /**
   * @param params
   */
  @Get(':id')
  async show(@Param() params): Promise<object> {
    return await this.CrashReportService.findOneById(params.id);
  }

  /**
   * @param params
   * @param CreateCrashReportDto
   */
  @Patch(':id')
  async update(@Param() params, @Body() CreateCrashReportDto: CreateCrashReportDto): Promise<void> {
    const resource = await this.CrashReportService.findOneById(params.id);
    return await this.CrashReportService.updateById(Object.assign(resource, CreateCrashReportDto), params.id);
  }

  /**
   * @param params
   */
  @Delete(':id')
  async destroy(@Param() params): Promise<object> {
    const entity = await this.CrashReportService.findOneById(params.id);
    if (this.checkIfUndefined(entity)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      const resource = await this.CrashReportService.deleteById(params.id);
      return { status: 'ok' };
    }
  }

  /**
   * @param payload
   */
  private checkIfUndefined(payload) {
    if (typeof payload === 'undefined') {
      return true;
    } else {
      return false;
    }
  }
}
