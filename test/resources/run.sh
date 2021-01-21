#!/bin/sh

docker-compose -f ./test/resources/docker-compose.yml build
docker-compose -f ./test/resources/docker-compose.yml up --force-recreate --remove-orphans -d
