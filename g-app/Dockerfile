FROM node
ENV NODE_ENV=production
WORKDIR /app
COPY packa* ./
RUN npm install --production
COPY . ./
CMD node app.js
