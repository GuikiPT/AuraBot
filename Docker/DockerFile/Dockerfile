# From Alpine Linux
FROM alpine:latest


# Run essential packages installation
RUN echo "Installing essential packages . . ."
RUN apk update
RUN apk add --no-cache \
    git \
    nodejs \
    wget \
    curl \
    nano \
    npm \
    yarn \
    bash

# Setting up 
RUN mkdir -p /workspace/
WORKDIR /workspace/
RUN git clone https://github.com/GuikiPT/AuraBot.git
WORKDIR /workspace/AuraBot
RUN yarn install

ENTRYPOINT [ "yarn", "start" ]