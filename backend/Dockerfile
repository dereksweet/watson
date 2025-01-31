FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN test -f private_system_instructions.txt && cp private_system_instructions.txt system_instructions.txt || true
EXPOSE 3001
CMD ["npm", "start"]
