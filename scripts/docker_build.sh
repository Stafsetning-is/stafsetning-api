#!/bin/bash

set -e

GIT_COMMIT=$1

docker build -t gabriels17/stafsetning-api:$GIT_COMMIT .
docker push gabriels17/stafsetning-api:$GIT_COMMIT