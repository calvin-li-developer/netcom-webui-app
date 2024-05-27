FROM nginx

LABEL name="Calvin"
LABEL email="calvin.li.developer@gmail.com"

COPY . /usr/share/nginx/html/

# docker build -t netcomwebuiapp .