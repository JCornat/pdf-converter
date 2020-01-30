import * as Log from 'node-logger-c7z';

export function init(): void {
  subscribeExceptions();
}

function subscribeExceptions(): void {
  process.on('uncaughtException', (error) => {
    console.error('uncaughtException', error);
    Log.critical({action: 'uncaughtException', message: `${error}`});
  });

  process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error);
    Log.critical({action: 'unhandledRejection', message: `${error}`});
  });
}
