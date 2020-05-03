FROM node:12

ENV HOME /r2
WORKDIR $HOME

COPY . $HOME
RUN npm install
RUN npm run postinstall
RUN npm run build

RUN rm -rf node_modules

CMD npm start
