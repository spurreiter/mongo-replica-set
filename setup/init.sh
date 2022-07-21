#!/usr/bin/env sh

opts="$1"
sleep="$2"

if [ ! -z "$sleep" ]; then
  sleep "$sleep"
	# echo
fi

init_db () {
	mongosh \
		--username $MONGO_INITDB_ROOT_USERNAME \
		--password $MONGO_INITDB_ROOT_PASSWORD \
		$opts \
		$1
}

init_db /setup/init-rs.js
init_db /setup/init-db.js
