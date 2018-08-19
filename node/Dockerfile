FROM node:8

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3000
EXPOSE 35729

#ENTRYPOINT ["/bin/bash", "/app/run.sh"]
#CMD ["start"]