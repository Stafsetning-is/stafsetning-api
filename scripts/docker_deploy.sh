#!/bin/bash

set -e

IMAGE_NAME=$1
REGISTRY_USER=$2
REGISTRY_PASS=$3
GIT_COMMIT=$4

docker login -u $REGISTRY_USER -p $REGISTRY_PASS
docker build -t $IMAGE_NAME:$GIT_COMMIT -t $IMAGE_NAME:latest .
docker push $IMAGE_NAME:$GIT_COMMIT && docker push $IMAGE_NAME:latest