# Use the node image
FROM node:latest

# Maintainer label
LABEL maintainer="Gabríel"

# Set container work directory to /code
WORKDIR /code

# Copy the dependency file to the container
COPY package.json package.json

# Install all the dependencies
RUN npm install --only=prod

# Copy the node application files
COPY . .

# Build the application
RUN npm run build

# Run the application within the container
CMD ["npm", "start"]