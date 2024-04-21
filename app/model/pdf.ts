import { chromium } from 'playwright';

import { time } from '@model/time.ts';
import { Config } from '@config/config.ts';
import { Directory } from '@model/directory.ts';
import { Global } from '@model/global.ts';
import { PPdfConvertHtmlContent } from '@model/definition.ts';

export namespace Pdf {
  export function randomInteger(min: number = 100000, max: number = 999999): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  export function formatOptions(data: Record<string, any>): PPdfConvertHtmlContent {
    const margin = {
      top: data.marginTop,
      left: data.marginLeft,
      right: data.marginRight,
      bottom: data.marginBottom,
    };

    return {
      content: data.html,
      headerTemplate: data.headerTemplate,
      footerTemplate: data.footerTemplate,
      style: data.style,
      format: data.format,
      landscape: (data.landscape === 'true'),
      width: data.width,
      height: data.height,
      filename: data.filename,
      margin,
    };
  }

  export async function convertHtmlContent(options: PPdfConvertHtmlContent): Promise<string> {
    if (Global.isEmpty(options?.content)) {
      throw {status: 400, message: `Empty content cannot be empty`};
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.setContent(options.content);

    let title: string;
    if (options.filename) {
      title = `${options.filename.replace(/[^a-zA-Z0-9-_]/g, '')}.pdf`;
    } else {
      const currentDate = time().format('MMDDHHmmsss');
      const random = randomInteger();
      title = `${currentDate}-${random}.pdf`;
    }

    const margin = {
      top: options.margin?.top || 20,
      left: options.margin?.left || 20,
      right: options.margin?.right || 20,
      bottom: options.margin?.bottom || 20,
    };

    const resetCSS = await Deno.readTextFile(`${Deno.cwd()}/private/reset.css`);
    const defaultCSS = await Deno.readTextFile(`${Deno.cwd()}/private/default.css`);
    const headerCSS = await Deno.readTextFile(`${Deno.cwd()}/private/header.css`);

    let headerTemplate: string = ' ';
    let footerTemplate: string = ' ';
    const displayHeaderFooter = (Global.isPopulated(options.headerTemplate) || Global.isPopulated(options.footerTemplate));
    if (displayHeaderFooter) {
      const headerFooterCSS = `
      <style>
        ${resetCSS}
        ${defaultCSS}
        ${headerCSS}
      </style>
    `;

      if (Global.isPopulated(options.headerTemplate)) {
        headerTemplate = `${headerFooterCSS}<header>${options.headerTemplate}</header>`;
      }

      if (Global.isPopulated(options.footerTemplate)) {
        footerTemplate = `${headerFooterCSS}<footer>${options.footerTemplate}</footer>`;
      }
    }

    let format;
    let width;
    let height;
    if (Global.isPopulated(options.width) && Global.isPopulated(options.height)) {
      width = options.width;
      height = options.height;
    } else {
      format = options.format || 'A4';
    }

    const landscape = options.landscape || false;

    const optionsPDF = {
      path: `${Deno.cwd()}/public/pdf/${title}`,
      format,
      width,
      height,
      margin,
      scale: 1,
      landscape,
      displayHeaderFooter,
      headerTemplate,
      footerTemplate,
    };

    await page.addStyleTag({content: `${resetCSS}${defaultCSS}`});

    if (Global.isPopulated(options.style)) {
      await page.addStyleTag({content: options.style});
    }

    await page.emulateMedia({media: 'screen'});
    await page.pdf(optionsPDF);
    await browser.close();

    return `${Config.URL}/public/pdf/${title}`;
  }

  export async function cleaner(): Promise<void> {
    try {
      const options = {
        directory:  `${Deno.cwd()}/public/pdf`,
        timeUnit: 'hours',
        timeValue: 1,
        whitelist: ['.gitkeep'],
      };

      await Directory.removeOldFiles(options);
    } catch (error) {
      console.error('error cron', 'cleaner', error);
    }
  }
}
