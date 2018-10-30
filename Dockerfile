FROM node:8.11

ENV APP_MOCKS='1'

WORKDIR /src
ADD build.tar .

CMD [ "node", "./build/server/server" ]