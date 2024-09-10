# Use Node.js v20.15.1 runtime as a base image
FROM node:20.15.1

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app will run on (assuming it's 3000)
EXPOSE 8080

# Command to run your application
CMD [ "npm", "start" ]
