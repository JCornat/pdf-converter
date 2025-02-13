import { CronJob } from 'cron';

import { ENABLE_CRON } from '../config/config';
import * as PDF from '../model/pdf';

export function init(): any {
  try {
    if (!ENABLE_CRON) {
      return;
    }

    const cron0 = new CronJob('* * * * *', PDF.cleaner, null, true, 'Europe/Paris'); // Clean regularly documents
  } catch (error) {
    console.error(error);
    throw error;
  }
}
