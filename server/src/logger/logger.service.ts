import { Injectable } from '@nestjs/common';
import { LogDto } from './dto/log.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LoggerService {
  private readonly loggerUrl = process.env.LOGGER_URL;

  constructor(private readonly httpService: HttpService) {}

  async createLog(eventType: string, message: string): Promise<LogDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.loggerUrl}`, { eventType, message }),
      );
      return response.data;
    } catch (error) {
      console.error('Error creating log', error);
      throw error;
    }
  }

  async getLogs(): Promise<LogDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.loggerUrl}`),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching logs', error);
      throw error;
    }
  }

  async getLog(id: string): Promise<LogDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.loggerUrl}/${id}`),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching log', error);
      throw error;
    }
  }

  async updateLog(
    id: string,
    eventType: string,
    message: string,
  ): Promise<LogDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.loggerUrl}/${id}`, {
          eventType,
          message,
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error updating log', error);
      throw error;
    }
  }

  async removeLog(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.loggerUrl}/${id}`),
      );
      return response.data;
    } catch (error) {
      console.error('Error deleting log', error);
      throw error;
    }
  }
}

// @Injectable()
// export class LoggerService {
//   private readonly loggerUrl = process.env.LOGGER_URL;

//   async createLog(eventType: string, message: string): Promise<LogDto> {
//     try {
//       const response = await fetch(this.loggerUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ eventType, message }),
//       });

//       if (!response.ok) {
//         throw new Error(`Error creating log: ${response.statusText}`);
//       }

//       const data = (await response.json()) as LogDto;
//       return data;
//     } catch (error) {
//       console.error('Error creating log', error);
//     }
//   }

//   async getLogs(): Promise<LogDto[]> {
//     try {
//       const response = await fetch(this.loggerUrl, { method: 'GET' });
//       if (!response.ok) {
//         throw new Error(`Error fetching logs: ${response.statusText}`);
//       }

//       const data = (await response.json()) as LogDto[];
//       return data;
//     } catch (error) {
//       console.error('Error fetching log', error);
//     }
//   }

//   async getLog(id: string): Promise<LogDto> {
//     try {
//       const response = await fetch(`${this.loggerUrl}/${id}`, {
//         method: 'GET',
//       });
//       if (!response.ok) {
//         throw new Error(`Error fetching log: ${response.statusText}`);
//       }
//       const data = (await response.json()) as LogDto;
//       return data;
//     } catch (error) {
//       console.error('Error fetching log', error);
//     }
//   }
// }
