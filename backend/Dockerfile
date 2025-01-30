FROM node:20
ENV GEMINI_PROJECT=sherlock-447721
ENV GEMINI_LOCATION=us-central1
ENV GEMINI_MODEL=gemini-1.0-pro
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
