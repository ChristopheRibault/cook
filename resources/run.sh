#!/bin/sh

docker-compose -f ./resources/docker-compose.yml build
docker-compose -f ./resources/docker-compose.yml up --force-recreate --remove-orphans -d
