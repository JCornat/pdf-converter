import * as moment from 'moment';
import * as path from 'path';
import * as puppeteer from 'puppeteer';

import { URL } from '../config/config';
import * as Directory from './directory';

export function randomInteger(min: number = 100000, max: number = 999999) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export async function convertHtmlContentToPDF(content: string): Promise<string> {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  await page.setContent(content);

  const currentDate = moment().format('MMDDHHmmsss');
  const random = randomInteger();
  const title = `${currentDate}-${random}.pdf`;
  const destination = path.join(__dirname, '..', 'public', 'pdf', title);

  const options = {
    path: destination,
    format: 'A4',
    margin: {top: 20, left: 20, right: 20, bottom: 20},
  };

  await page.pdf(options);
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
