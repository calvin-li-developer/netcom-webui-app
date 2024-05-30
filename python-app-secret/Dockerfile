FROM python:3

LABEL name="Calvin"
LABEL email="calvin.li.developer@gmail.com"

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

WORKDIR /bmo/pythonapp/

COPY myapp.py .
CMD [ "python3", "myapp.py" ]