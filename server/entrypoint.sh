#!/bin/sh
set -e

envsubst '${REACT_APP_API_URL} ${KEYCLOAK_SERVER_URL} ${KEYCLOAK_CLIENT}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf-updated
rm -rf /etc/nginx/conf.d/default.conf
mv /etc/nginx/conf.d/default.conf-updated /etc/nginx/conf.d/default.conf
exit 0;
