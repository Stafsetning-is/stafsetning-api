![Logo](./docs/img/logo.png)

# Stafsetning.is API
[![Build Status](https://travis-ci.org/Stafsetning-is/stafsetning-api.svg?branch=master)](https://travis-ci.org/Stafsetning-is/stafsetning-api)
[![codecov](https://codecov.io/gh/Stafsetning-is/stafsetning-api/branch/master/graph/badge.svg)](https://codecov.io/gh/Stafsetning-is/stafsetning-api)
[![dependencies Status](https://david-dm.org/Stafsetning-is/stafsetning-api/status.svg)](https://david-dm.org/Stafsetning-is/stafsetning-api)

API for stafsetning.is

Contains all the routes, methods and more for the site's [frontend](https://github.com/Stafsetning-is/stafsetning-frontend/).

* [Setup](#setup)
* [Documentation](#documentation)
* [License](#license)

## Setup

To setup on a local machine follow these steps.

**1.** Open your favorite terminal and clone the repository to a directory with SSH or with HTTPS. Navigate to the newly created repository

`$ git clone git@github.com:Stafsetning-is/stafsetning-api.git`

`$ git clone https://github.com/Stafsetning-is/stafsetning-api.git`

`$ cd stafsetning-api`

**2.** Install all the necessary dependencies with npm. If you don't have npm, head to the [NodeJS website](https://nodejs.org/en/download/) and follow the steps to install Node which comes with npm. Write in your terminal:

`$ npm install`

**3.** Provide all the required environment variables. First create a .env file.

`$ touch .env` or by using our favorite text editor 😉 `vim .env`

The environment variables required are

MONGODB_URI<br>
MONGODB_URI_LOCAL<br>
SESSION_SECRET<br>
PORT<br>
USER_PW_HASH_KEY<br>
S3_ACCESS_KEY<br>
S3_SECRET_KEY<br>
AVATAR_BUCKET_NAME

Copy and paste these to your .env file with valid values.

**4.** Start up the API with npm

`$ npm run dev`

You should see something similar to this:

```
{"message":"Logging initialized at debug level","level":"debug","timestamp":"2020-05-05T23:37:48.832Z"}
{"message":"Using .env file to supply config environment variables","level":"debug","timestamp":"2020-05-05T23:37:48.839Z"}
  App is running at http://localhost:5000 in development mode
  Press CTRL-C to stop

{"level":"info","message":"Connected to MongoDB","timestamp":"2020-05-05T23:37:50.560Z"}
{"level":"info","message":"Connected to MongoDB","timestamp":"2020-05-05T23:37:50.560Z"}
```

**5.** Open a web client (we recommend [Postman](https://www.postman.com/downloads/)) or a browser of your choice and type in the URL: localhost:5000 (or 127.0.0.0:5000 if you're a savvy developer). You should be greeted with a pleasant welcome message. 

`Hello from the API!`

Alternatively you can visit the API with the link at the top of the repository page. You can use our Postman collection to try all the specified routes.

## Documentation
You can view the [Postman documentation](https://documenter.getpostman.com/view/6487412/SzmcbeUg) to try out the supported routes.

## License
Usage is provided under the [MIT License](https://opensource.org/licenses/MIT). See LICENSE for the full details.
