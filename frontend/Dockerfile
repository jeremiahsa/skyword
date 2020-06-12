#https://mherman.org/blog/dockerizing-a-react-app/
FROM node:13.12.0-alpine

WORKDIR /app/

COPY package.json package-lock.json /app/

RUN npm install 
RUN npm install react-scripts@3.4.1 -g

COPY . /app/

EXPOSE 3000

CMD ["npm", "start"]