#!/bin/bash

export GIT_COMMIT=$1
export API_URL=$2
export ENVIRONMENT=$3
docker-compose down
docker-compose up -d