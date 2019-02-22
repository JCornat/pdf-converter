import * as puppeteer from 'puppeteer';
import * as moment from 'moment';
import * as path from 'path';

import { URL, PATIENT } from '../config/config';

export async function test(): Promise<void> {
  console.log('--- PATIENT ---');

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const pages = [
      'start',
      'login',
      'results',
      'resultAnalyse',
    ];

    for (const item of pages) {
      try {
        await eval(item)(page);
        const currentDate = moment();
        await page.waitFor(1000);
        const nameFile = `${currentDate.format('YYYYMMDDHHmmssSSS')}.png`;
        const pathFile = path.join(__dirname, '..', 'test', 'patient', nameFile);
        await page.screenshot({ path: pathFile });
        console.log(item, 'OK');
      } catch (error) {
        console.error(item, 'ERROR', error);
      }
    }

    await browser.close();
  } catch (error) {
    console.log('--- PATIENT ERROR ---');
    console.error(error);
  }
}

async function start(page: any): Promise<any> {
  await page.setViewport({ width: 1920, height: 1080 });
  page.goto(URL);
  await page.waitForNavigation();
}

async function login(page: any): Promise<void> {
  await page.type('#username', PATIENT.login);
  await page.type('#password', PATIENT.password);
  page.click('button.c7z-button');
  await page.waitForNavigation();
}

async function results(page: any): Promise<void> {
  page.click('patient-result-item > .row');
  await page.waitForNavigation();
}

async function resultAnalyse(page: any): Promise<void> {
  page.click('result-analyse > div > .row');
}
