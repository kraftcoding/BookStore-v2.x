FROM node:18-alpine AS deps


# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies
COPY /frontend/App/package.json /usr/src/
COPY /frontend/App/package-lock.json /usr/src/
RUN npm install

# Bundle app source
COPY /frontend/App /usr/src

RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]