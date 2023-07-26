FROM node:16

#RUN npm install -g pnpm@6.32.14

RUN npm install -g pnpm


WORKDIR /happywork/web

ENV APP_NAME="happywork-web" \
    APP_VERSION="1.0.0" \
    APP_DESCRIPTION="happywork Web" \
    HOSTNAME="0.0.0.0" \
    PORT="3000"

ENV NEXT_PUBLIC_BASE_URL="https://happywork.tech" \
    NEXT_PUBLIC_KEYCLOAK_URL="https://auth.happywork.tech/auth/" \
    NEXT_PUBLIC_KEYCLOAK_REALM="TRIAL" \
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID="happywork-admin-web" 


COPY package*.json ./


RUN pnpm install


COPY . .


RUN pnpm run build

EXPOSE $PORT

ENTRYPOINT [ "pnpm" , "start"]