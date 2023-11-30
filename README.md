# G Drive Risk Management System

## Installation

Clone repositories

```
git clone https://github.com/dabhekarankit/ankit-challenge-full-stack.git
```

Run below commands for copy .env.example => .env

```
copy .env.example .env
```

Run below command for install all packages

```
npm i
```

Set DB config in .env file

```
DB_CONNECTION=postgres
DB_PORT=5432
DB_HOST=127.0.0.1
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=g_driver_risk_management
```

Steps for set up a Google Cloud Project and Enable the Google Drive API

-   Go to the [Google Cloud Console](https://console.cloud.google.com/).
-   Create a new project or select an existing one.
-   Enable the Google Drive API for your project.
-   Create OAuth 2.0 credentials (Client ID and Client Secret).
    Add the redirect URI (http://localhost:3000/oauth2callback) to the list of authorized redirect URIs.

```
O_AUTH_CLIENT_ID=
O_AUTH_CLIENT_SECRET=
O_AUTH_REDIRECT_URL=http://{YOUR_HOST}:{YOUR_PORT}/oauth2callback
```

Run project in Local

```
npm run start:local
```

Run project on server

```
npm run start
```

Open in chrome for local

```
http://localhost:3000
```

Open in chrome for live

```
https://{YOUR_HOST_URL}:{YOUR_PORT}
```
