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

export async function convertHtmlContentToPDF(options: { content: string, headerTemplate?: string, footerTemplate?: string, style?: string, format?: string, landscape?: boolean, width?: string | number, height?: string | number, margin?: { top?: string | number, left?: string | number, right?: string | number, bottom?: string | number }, filename?: string }): Promise<string> {
  if (Global.isEmpty(options?.content)) {
    throw {status: 400, message: `Empty content cannot be empty`};
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(options.content);

  let title: string;
  if (options.filename) {
    title = options.filename;
  } else {
    const currentDate = moment().format('MMDDHHmmsss');
    const random = randomInteger();
    title = `${currentDate}-${random}.pdf`;
  }

  const destination = path.join(__dirname, '..', 'public', 'pdf', title);

  const margin = {
    top: options.margin?.top || 20,
    left: options.margin?.left || 20,
    right: options.margin?.right || 20,
    bottom: options.margin?.bottom || 20,
  };

  const resetCSS = fs.readFileSync(path.join(__dirname, '..', 'private', 'reset.css'), 'utf-8');
  const defaultCSS = fs.readFileSync(path.join(__dirname, '..', 'private', 'default.css'), 'utf-8');
  const headerCSS = fs.readFileSync(path.join(__dirname, '..', 'private', 'header.css'), 'utf-8');

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
    `

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
    path: destination,
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
