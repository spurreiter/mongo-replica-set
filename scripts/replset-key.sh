#!/usr/bin/env sh

CWD=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd "$CWD/../setup"

KEY_FILE=replset.key

openssl rand -base64 756 | tr -d '\n' > ${KEY_FILE} \
  && chmod 400 ${KEY_FILE}
