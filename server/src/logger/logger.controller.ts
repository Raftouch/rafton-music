import { Body, Controller, Post } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LogDto } from './dto/log.dto';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  async createLog(
    @Body() body: { eventType: string; message: string },
  ): Promise<LogDto> {
    const { eventType, message } = body;
    return await this.loggerService.createLog(eventType, message);
  }
}
