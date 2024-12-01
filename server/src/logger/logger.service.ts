import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly loggerUrl = process.env.LOGGER_URL;

  async createLog(eventType: string, message: string): Promise<void> {
    try {
      const response = await fetch(this.loggerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventType, message }),
      });

      if (!response.ok) {
        throw new Error(`Error creating log: ${response.statusText}`);
      }

      console.log(`Log: ${eventType}`);
    } catch (error) {
      console.error('Error creating log', error);
    }
  }

  async getLog(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.loggerUrl}/${id}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Error fetching log: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching log', error);
    }
  }
}
