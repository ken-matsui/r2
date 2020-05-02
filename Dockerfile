FROM node:12

ENV HOME /r2
WORKDIR $HOME

COPY package.json package-lock.json $HOME/
RUN npm install

COPY . $HOME
RUN npm run build
CMD npm start
