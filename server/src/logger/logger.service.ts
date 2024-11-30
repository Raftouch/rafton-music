import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly loggerUrl = process.env.LOGGER_URL;

  async logEvent(eventType: string, message: string): Promise<void> {
    try {
      const response = await fetch(this.loggerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventType, message }),
      });

      if (!response.ok) {
        throw new Error(`Error logging event: ${response.statusText}`);
      }

      console.log(`Logged event: ${eventType}`);
    } catch (error) {
      console.error('Error logging event', error);
    }
  }
}
