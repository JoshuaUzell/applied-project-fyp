FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
RUN npm install -g @ionic/cli
COPY . .
EXPOSE 8100
CMD ["ionic", "serve", "--host", "0.0.0.0"]
