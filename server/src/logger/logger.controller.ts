import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LogDto } from './dto/log.dto';

@Controller('api/logs')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  create(@Body() logDto: LogDto) {
    return this.loggerService.createLog(logDto.eventType, logDto.message);
  }

  @Get()
  findAll(): Promise<LogDto[]> {
    return this.loggerService.getLogs();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LogDto> {
    return this.loggerService.getLog(id);
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() logDto: LogDto) {
  //     return this.loggerService.updateLog(id);
  //   }

  //   @Delete()
  //   remove(@Param('id') id: string) {
  //     return this.loggerService.removeLog(id);
  //   }
}
