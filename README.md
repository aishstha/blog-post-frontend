# Setup

Clone this repository.

```bash
$ git clone git@github.com:aishwarya4shrestha/blog-post-frontend.git
```

Install dependencies. Make sure you already have `nodejs`, `npm` and `yarn` installed in your system.

```bash
$ npm install
```

Make a copy of `.env.example` as `.env` file for environment variables.

```bash
$ cp .env.example .env
```

## Configure your .env file with
```
REACT_APP_GOOGLE_CLIENT_ID = <CLIENTID> //Keep same client id in both backend and frontend. Backend constant in .env keep: GOOGLE_CLIENT_ID:<CLIENTID>

REACT_APP_API_BASE_URI =http://localhost:8000/api/
```

## Running locally

```bash
$ npm run start
```
