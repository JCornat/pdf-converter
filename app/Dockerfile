ARG image

FROM $image

# Server part
WORKDIR /src

# Add dependencies files
ADD package.json .
ADD package-lock.json .
ADD tsconfig.json .

RUN apt purge -y nodejs && \
    curl -sL https://deb.nodesource.com/setup_22.x | bash - && \
    apt update && \
    apt install -y nodejs && \
    npm install && \
    npx playwright install --with-deps chromium && \

# Compile files and launch server
CMD npx tsc && \
    node app.js
