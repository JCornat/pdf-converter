ARG image

FROM $image

# Server part
WORKDIR /src

# Add dependencies files
ADD package.json .
ADD package-lock.json .
ADD tsconfig.json .

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt purge -y nodejs && \
    curl -sL https://deb.nodesource.com/setup_15.x | bash - && \
    apt update && \
    apt install -y nodejs && \
    npm install -g typescript && \
    npm install

# Compile files and launch server
CMD tsc && \
    node app.js
