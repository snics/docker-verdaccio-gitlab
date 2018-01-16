FROM node:9

MAINTAINER Nico Swiatecki <nico@devninjas.io>

RUN groupadd --gid 1001 verdaccio \
  && useradd --uid 1001 --gid verdaccio --shell /bin/bash --create-home verdaccio
WORKDIR /home/verdaccio
USER verdaccio


ADD package.json .

RUN npm install

ADD config.yaml .
ADD configure.js .
ADD start.sh .

CMD ["./start.sh"]
EXPOSE 4873
VOLUME /home/verdaccio
