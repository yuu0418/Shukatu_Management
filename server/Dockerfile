FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY  . .

COPY .env .env

# 最後に追加
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "dev"]
