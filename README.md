# cerberus

Based on Puppeteer, convert HTML content to PDF via API.

## API

Send GET request, like `https://myserver.com/api/convert?html=<h1>Hello</h1>`.  
Server will return url where document is available, example : `https://myserver.com/public/pdf/02132102983-533083.pdf`.
Documents are deleted after 1 hour.  

## Production

### Requirements

- Docker and docker-compose must be installed

### Configuration

- Docker Environment file `.env` must be present to project's root
- Node configuration file `config.ts` must be present into `app/config` folder

### Launch

```
docker-compose down
docker-compose build
docker-compose up
```

## Development

### Requirements

- Node.js must be installed

### Configuration

- Docker Environment file `.env` must be present to project's root
- Node configuration file `config.ts` must be present into `app/config` folder

### Before launch

```
npm i
```

### Launch

```
cd app
tsc && node app.js
```
