FROM node:18-alpine

WORKDIR /app

RUN apk update && apk upgrade \
    && apk add --no-cache git

COPY package*.json ./
RUN npm install

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 8000

CMD ["npm", "run", "dev"]
