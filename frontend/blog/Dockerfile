FROM node:16

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_STRAPI_API_URL
ENV NEXT_PUBLIC_STRAPI_API_URL=${NEXT_PUBLIC_STRAPI_API_URL}

EXPOSE 3000

RUN npm run build
