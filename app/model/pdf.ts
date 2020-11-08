import * as moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import { chromium } from 'playwright';

import { URL } from '../config/config';
import * as Directory from './directory';
import * as Global from './global';

export function randomInteger(min: number = 100000, max: number = 999999) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export async function convertHtmlContentToPDF(options: { content: string, headerTemplate?: string, footerTemplate?: string, margin?: { top: number, left: number, right: number, bottom: number } }): Promise<string> {
  if (Global.isEmpty(options?.content)) {
    throw {status: 400, message: `Empty content cannot be empty`};
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(options.content);

  const currentDate = moment().format('MMDDHHmmsss');
  const random = randomInteger();
  const title = `${currentDate}-${random}.pdf`;
  const destination = path.join(__dirname, '..', 'public', 'pdf', title);

  const displayHeaderFooter = (Global.isPopulated(options.headerTemplate) || Global.isPopulated(options.footerTemplate));
  const optionsPDF = {
    path: destination,
    format: 'A4',
    margin: {top: 100, left: 100, right: 100, bottom: 100},
    displayHeaderFooter,
    headerTemplate: options.headerTemplate,
    footerTemplate: options.footerTemplate,
  };

  await page.pdf(optionsPDF);
  await browser.close();

  return `${URL}/public/pdf/${title}`;
}

export async function cleaner(): Promise<any> {
  try {
    const options = {
      directory: path.join(__dirname, '..', 'public', 'pdf'),
      timeUnit: 'hours',
      timeValue: 1,
      whitelist: ['.gitkeep'],
    };

    await Directory.removeOldFiles(options);
  } catch (error) {
    console.error('error cron', 'cleaner', error);
  }
}
