import { Global } from '@model/global.ts';
import { time } from './time.ts';

export namespace Directory {
  export async function removeOldFiles(options: { directory: string, whitelist?: string[], timeUnit: any, timeValue: number }): Promise<void> {
    if (Global.isEmpty(options) || Global.isEmpty(options.directory) || Global.isEmpty(options.timeUnit) || Global.isNaN(options.timeValue)) {
      throw {status: 400, message: 'Paramètres invalides'};
    }

    if (Global.isEmpty(options.whitelist)) {
      options.whitelist = [];
    }

    const currentDate = time();
    for await (const file of Deno.readDir(options.directory)) {
      const fileUrl = `${options.directory}/${file}`;
      if (options.whitelist!.indexOf(file.name) >= 0) {
        continue;
      }

      const stat = await Deno.stat(fileUrl);
      const createdAt = time(stat.birthtime as Date);
      if (currentDate.diff(createdAt, options.timeUnit, true) < options.timeValue) {
        continue;
      }

      await Deno.remove(fileUrl);
    }
  }
}
