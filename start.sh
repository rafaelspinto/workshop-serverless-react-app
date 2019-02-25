#!/bin/bash

function info() {
	echo -e "\033[1;34m$1\033[0m" $2
}
function ok() {
	echo -e "\033[1;32mDONE\033[0m"
}

CREDS_FILE=~/.aws/credentials

if [ ! -f $CREDS_FILE ]; then
	info "INFO:" "Credentials file not found: $CREDS_FILE. Please run the following command:"
	echo
	echo "   aws configure"
	echo
	exit
fi

if ! docker network inspect lambda-local 2>/dev/null 1>/dev/null; then
	info "Preparing docker network..."
	docker network create lambda-local && ok;
fi

if ! ls presentation/node_modules 2>/dev/null 1>/dev/null; then
	info "Preparing Presentation tier....."
	cd presentation && npm install && ok; cd ..
fi

if ! ls logic/handlers/node_modules 2>/dev/null 1>/dev/null; then
	info "Preparing Logic tier....."
	cd logic/handlers && npm install && ok; cd -
fi

if ! ls data/node_modules 2>/dev/null 1>/dev/null; then
	info "Preparing Data tier....."
	cd data && npm install && ok; cd -
fi

if ! docker inspect dynamodb-local 2>/dev/null 1>/dev/null; then
	info "Starting DynamoDB Local...."
	docker run -d --rm --name dynamodb-local --network lambda-local -p 8000:8000 amazon/dynamodb-local 1>/dev/null && ok
	info "Creating Tables...."
	cd data && npm run create-db 1>/dev/null && ok
fi
cd ..
echo

info "INFO:" "To start the application open 2 terminals and run the followings commands:"
echo
echo "     cd presentation; npm start"
echo
echo "     cd logic; sam local start-api --docker-network lambda-local"
echo
info "INFO:" "To stop the local DynamoDB run the following command:"
echo
echo "     docker stop dynamodb-local"
echo
