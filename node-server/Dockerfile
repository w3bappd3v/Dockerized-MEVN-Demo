# Use a lighter version of Node as a parent image
FROM node:alpine
# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY package*.json /client/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . /client/
# Make port available to the world outside this container
# EXPOSE 9000
# Run the app when the container launches
CMD ["node", "server.js"]

# docker run -it -p 8080:8080 --rm imagename