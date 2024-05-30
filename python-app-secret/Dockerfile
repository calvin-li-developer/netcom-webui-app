FROM python:3

LABEL name="Calvin"
LABEL email="calvin.li.developer@gmail.com"

RUN adduser nonroot

USER nonroot

WORKDIR /bmo/pythonapp/

COPY myapp.py .
CMD [ "python3", "myapp.py" ]