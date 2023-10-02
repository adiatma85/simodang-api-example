import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricQueryDto } from './dto/metric-query.dto';
import { DevicesService } from 'src/devices/devices.service';

@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly devicesService: DevicesService,
  ) {}

  @Post()
  async create(@Body() createMetricDto: CreateMetricDto) {
    const metric = await this.metricsService.create(createMetricDto);
    await this.devicesService.changePondStatusByThreshold(createMetricDto);

    return metric;
  }

  @Get('/:id')
  findMetricsByRangeDate(
    @Param('id') id: string,
    @Query() metricsQueryDto: MetricQueryDto,
  ) {
    const { avg } = metricsQueryDto;
    if (avg == 1) {
      return this.metricsService.findAggregatedMetricsByRangeDate(
        id,
        metricsQueryDto,
      );
    }
    return this.metricsService.findAllMetricsByHour(id, metricsQueryDto);
  }

  @Get('/last/:id')
  findLastMetric(@Param('id') id: string) {
    return this.metricsService.findLastMetric(id);
  }

  @Get('/device/:id')
  findDeviceMetricByHour(
    @Param('id') id: string,
    @Query() metricsQueryDto: MetricQueryDto,
  ) {
    return this.metricsService.findDeviceMetricByHour(id, metricsQueryDto);
  }
}
