# Use the node image
FROM node:latest

# Maintainer label
LABEL maintainer="Gabríel S"

# Set container work directory to /code
WORKDIR /code

# Copy the node application files
COPY . .

# Install all the dependencies
RUN npm ci

# Build the application
RUN npm run build

# Run the application within the container
CMD ["npm", "start"]