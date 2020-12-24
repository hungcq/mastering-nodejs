# Dockerfile
FROM node:14
LABEL maintainer="hungcq1996@gmail.com"
ENV NODE_ENV=development
WORKDIR /app
COPY ./app .
RUN npm i
EXPOSE 8087
CMD [ "npm", "start" ]