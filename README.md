# PDF Converter

Based on [Playwright](https://github.com/microsoft/playwright), convert HTML content to PDF via API.

## API

Send GET request on `/api/convert`, like `https://myserver.com/api/convert?html=<h1>Hello</h1>`.  
Support POST request on `/api/convert` with body data.  

Server will return url where document is available, example : `https://myserver.com/public/pdf/02132102983-533083.pdf`.
Documents are deleted after 1 hour.  

### Available options

#### Mandatory options

##### `html` \<string\>
HTML template, ie: `<h1>Hello</h1>`

#### Optional options
##### `marginTop` \<string | number\>
Customize top margin for *html* content only, header/footer templates are not affected.  
Can be number : `px` or string : `px`, `in`, `cm`, `mm`

##### `marginLeft` \<string | number\>
Same as marginTop option

##### `marginRight` \<string | number\>
Same as marginTop option

##### `marginBottom` \<string | number\>
Same as marginTop option

##### `headerTemplate` \<string | number\>
HTML template, ie: `<div style="margin-left: 20px">header</div>`.  
Header template is not affected by content margin, so you have to specify it inside your HTML  
Add tag with following classes to put content inside :  
- date : formatted print date
- title : document title
- url : document location
- pageNumber : current page number
- totalPages : total pages in the document

Example :
```
<div class="date"></div>
<p><span class="pageNumber"></span>/<span class="totalPages"></span></p>
```

##### `footerTemplate` \<string\>
Same as headerTemplate option

##### `style` \<string\>
CSS rules

##### `disableResetCSS` <'true'>
Reset CSS is applied by default for header, body and footer.  
You can disable it with `'true'` string.

##### `landscape` <'true'>
Specify PDF orientation, by default it is portrait.  
You can set at landscape with `'true'` value.  

##### `width` \<string\>
Paper width, accepts values labeled with units.  
Can be number : `px` or string : `px`, `in`, `cm`, `mm`

##### `height` \<string\>
Paper height, accepts values labeled with units.  
Can be number : `px` or string : `px`, `in`, `cm`, `mm`

##### `format` \<string\>
Paper format. If set, takes priority over width or height options. Defaults to 'Letter'.  
Values : 
- `Letter` (8.5in x 11in)
- `Legal` (8.5in x 14in)
- `Tabloid` (11in x 17in)
- `Ledger` (17in x 11in)
- `A0` (33.1in x 46.8in)
- `A1` (23.4in x 33.1in)
- `A2` (16.54in x 23.4in)
- `A3` (11.7in x 16.54in)
- `A4` (8.27in x 11.7in)
- `A5` (5.83in x 8.27in)
- `A6` (4.13in x 5.83in)


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
cd app
npm i
```

### Launch

```
cd app
tsc && node app.js
```
