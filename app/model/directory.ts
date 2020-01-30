import * as fs from 'fs';
import * as path from 'path';
import * as moment from 'moment';

import * as Global from './global';

export async function removeOldFiles(options: { directory: string, whitelist?: string[], timeUnit: any, timeValue: number }): Promise<any> {
  try {
    if (Global.isEmpty(options) || Global.isEmpty(options.directory) || Global.isEmpty(options.timeUnit) || Global.isNaN(options.timeValue)) {
      throw {status: 400, message: 'Paramètres invalides'};
    }

    if (Global.isEmpty(options.whitelist)) {
      options.whitelist = [];
    }

    const files = fs.readdirSync(options.directory);
    const currentDate = moment();

    for (const file of files) {
      const fileUrl = path.join(options.directory, file);
      if (options.whitelist.indexOf(file) >= 0) {
        continue;
      }

      const stat = fs.statSync(fileUrl);

      const createdAt = moment(stat.ctime);
      if (currentDate.diff(createdAt, options.timeUnit, true) > options.timeValue) {
        fs.unlinkSync(fileUrl);
      }
    }
  } catch (error) {
    console.error('error cron', 'cleaner', error);
  }
}
