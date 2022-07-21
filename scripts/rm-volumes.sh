#!/usr/bin/env sh

## remove all mongodata volumes

docker volume ls |\
	grep _mongodata |\
	awk '{print $2}' |\
	xargs docker volume rm

docker volume ls
