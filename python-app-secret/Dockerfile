FROM python:alpine

LABEL name="Calvin"
LABEL email="calvin.li.developer@gmail.com"

# Create a group and user
RUN adduser --disabled-password --no-create-home nonroot

USER nonroot

WORKDIR /bmo/pythonapp/

COPY myapp.py .
CMD [ "python3", "myapp.py" ]