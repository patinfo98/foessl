FROM node:18-alpine

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

RUN apk add --no-cache curl

COPY . .

ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NEXT_PUBLIC_STRAPI_API_URL=${NEXT_PUBLIC_STRAPI_API_URL}

EXPOSE 3000