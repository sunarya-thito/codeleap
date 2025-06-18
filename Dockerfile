FROM node:20

WORKDIR /app

COPY . .

RUN npm install lightningcss-linux-x64-gnu
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
