#!/bin/sh
set -e # Stop script from running if there are any errors

IMAGE="gabriels17/stafsetning-api"                             # Docker image
GIT_VERSION=$(git describe --always --abbrev --tags --long)    # Git hash and tags

# Build and tag image
docker build -t ${IMAGE}:${GIT_VERSION} .
docker tag ${IMAGE}:${GIT_VERSION} ${IMAGE}:latest

# Log in to Docker Hub and push
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push ${IMAGE}:${GIT_VERSION}

# TODO: SSH into DigitalOcean


# Find currently running container ID
CONTAINER_ID=$(docker ps | grep takenote | cut -d" " -f1)

# Stop, run, and clean
docker stop ${CONTAINER_ID}
docker run --restart unless-stopped -d -p 80:3000 ${IMAGE}:${GIT_VERSION}
docker system prune -a -f