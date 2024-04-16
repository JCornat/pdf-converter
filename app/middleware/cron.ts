import { Config } from '@config/config.ts';
import { Pdf } from '@model/pdf.ts';

export namespace CronMiddleware {
  export function init(): void {
    if (!Config.ENABLE_CRON) {
      return;
    }

    Deno.cron('Clean generated documents', '* * * * *', Pdf.cleaner)
      .catch((error) => console.error('CronMiddleware', 'Pdf.cleaner', error));
  }
}
