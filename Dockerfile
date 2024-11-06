# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:18.17.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install --legacy-peer-deps
COPY ./ /app/
# Aponta direto pra STAGING
#ARG configuration=staging
# Vai substituir as variaveis de ambientes na configuracao do Kubernets
ARG configuration=production
RUN npm run build -- --aot --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.23.4
#Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf