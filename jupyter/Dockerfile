FROM python

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/
RUN pip install -r requirements.txt
RUN python -m ipykernel install --user
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV LANG en_US.UTF-8
ENV PYTHONIOENCODING utf_8
ENV REDIS_HOST "redis"
