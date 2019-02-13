import * as moment from 'moment';
import * as path from 'path';
import * as puppeteer from 'puppeteer';

import { URL } from '../config/config';
import * as fs from "fs";

export function randomInteger(min: number = 100000, max: number = 999999) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export async function convertHtmlContentToPDF(content: string): Promise<string> {
  const currentDate = moment().format('MMDDHHMMSSS');
  const random = randomInteger();
  const title = `${currentDate}-${random}.pdf`;
  const destination = path.join(__dirname, '..', 'public', 'pdf', title)

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
  const page = await browser.newPage()

  await page.setContent(content);

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
    const WHITELIST = ['.gitkeep'];
    const directory = path.join(__dirname, '..', 'public', 'pdf');

    const files = fs.readdirSync(directory);

    for (const file of files) {
      const fileUrl = path.join(directory, file);
      if (WHITELIST.indexOf(file) >= 0) {
        continue;
      }

      const stat = fs.statSync(fileUrl);

      const createdAt = moment(stat.ctime);
      if (moment().diff(createdAt, 'hours') > 1) {
        fs.unlinkSync(fileUrl);
      }
    }
  } catch (error) {
    console.error('error cron', 'cleaner', error);
  }
}
