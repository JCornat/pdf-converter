import * as puppeteer from 'puppeteer';
import * as moment from 'moment';
import * as path from 'path';

export async function test(): Promise<void> {
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
      } catch (error) {
        console.error(error);
      }
    }

    await browser.close();
    console.log('ok');
  } catch (error) {
    console.error(error);
  }
}

async function start(page: any): Promise<any> {
  await page.setViewport({ width: 1920, height: 1080 });
  page.goto('http://localhost:4200');
  await page.waitForNavigation();
}

async function login(page: any): Promise<void> {
  await page.type('#username', 'cornat.jacques@gmail.com');
  await page.type('#password', 'atoutbio54');
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
