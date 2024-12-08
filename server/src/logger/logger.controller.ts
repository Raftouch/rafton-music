import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LogDto } from './dto/log.dto';
import { ApiTags } from '@nestjs/swagger';
// import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/logs')
@ApiTags('logs')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  //   @ApiCreatedResponse({
  //     description: 'Create log',
  //     type: LogDto,
  //   })
  create(@Body() logDto: LogDto): Promise<LogDto> {
    return this.loggerService.createLog(logDto.eventType, logDto.message);
  }

  @Get()
  //   @ApiOkResponse({
  //     description: 'Get all logs',
  //     type: LogDto,
  //     isArray: true,
  //   })
  findAll(): Promise<LogDto[]> {
    return this.loggerService.getLogs();
  }

  @Get(':id')
  //   @ApiOkResponse({
  //     description: 'Get log by id',
  //     type: LogDto,
  //   })
  findOne(@Param('id') id: string): Promise<LogDto> {
    return this.loggerService.getLog(id);
  }

  @Patch(':id')
  //   @ApiOkResponse({
  //     description: 'Update log',
  //     type: LogDto,
  //   })
  update(@Param('id') id: string, @Body() logDto: LogDto): Promise<LogDto> {
    return this.loggerService.updateLog(id, logDto.eventType, logDto.message);
  }

  @Delete(':id')
  //   @ApiOkResponse({
  //     description: 'Remove log',
  //   })
  remove(@Param('id') id: string): Promise<any> {
    return this.loggerService.removeLog(id);
  }
}
