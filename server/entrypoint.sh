#!/bin/sh
set -e

envsubst '${REACT_APP_API_URL} ${REACT_APP_KEYCLOAK_SERVER_URL} ${KEYCLOAK_CLIENT}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf-updated
find /usr/share/nginx/html/static/js -type f -print0 | xargs -0 sed -i s,VAR_APP_KEYCLOAK_SERVER_URL,$REACT_APP_KEYCLOAK_SERVER_URL,g
rm -rf /etc/nginx/conf.d/default.conf
mv /etc/nginx/conf.d/default.conf-updated /etc/nginx/conf.d/default.conf
exit 0;
