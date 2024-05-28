FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL name="Calvin"
LABEL email="calvin.li.developer@gmail.com"

COPY html/ /usr/share/nginx/html/

# docker build -t netcomwebuiapp .