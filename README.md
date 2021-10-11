# SalesForce Oauth .NET React

Simple one-in-all project made with .NET Core 3.1 and React + Typescript that authenticates using Oauth with SalesForce.
There is a user panel in which you can retrieve the SalesForce contacts, and view their details

## Tech Stack

**Client:** React, Typescript, MUI

**Server:** .NET Core 3.1

## Requirements

- .NET Core 3.1 SDK
- Node 12+
- Docker (optional)

## Environment Variables

To run this project, you will need to add the following environment variables to your system

`SALESFORCE_CLIENT_ID`

`SALESFORCE_SECRET`

`SALESFORCE_CALLBACK_URL`

## Requirements

### SalesForce Oauth

- Create a Salesforce developer account (https://developer.salesforce.com/signup)
- Click on the Salesforce icon on the top right corner and select `Switch to Salesforce Classic`
- Click on `Setup` on the top right navigation menu.
- From the left navigation menu, select `Build->Create->Apps`
- Under `Connected Apps`, click `New` to create a new connected app.
- Give the new connected app a name and supply an email address
- `Enable OAuth Settings`
- Enter the `Callback URL` that you will be using for your app
- Add the following `Avaliable OAuth Scopes`
  1. `Access and manage your data (api)`
  2. `Access your basic information (id, profile, email, address, phone)`
  3. `Peform requests on your behalf at any time (refresh_token, offline_access)`
  4. `Provide access to your data via the Web (web)`
- Click `Save`
- The API `Consumer Key` and the `Consumer Secret` will be needed to make your Salesforce API requests.

## Run Locally

Clone the project

```bash
  git clone https://github.com/agonzalezdev/salesforce-oauth-dotnet-api
```

Go to the project directory

```bash
  cd salesforce-oauth-dotnet-api
```

Install dependencies

```bash
  yarn
```

### Launch

To start the app just launch the task `.NET Core Launch (web)` with the mandatory [environment variables](#Environment-variables)

OR

```bash
  dotnet restore
  dotnet build
  dotnet run
```

## Docker deployment

The project has docker support, just run
`docker-dompose build` then `docker-dompose build`.

As we use SalesForce Oauth authentication, we need our dockerized application to run over https.
To achieve this, we will do the following:

1. Generate self-signed certificate with `dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx -p INSERT_YOUR_PASSWORD`
2. Make local machine trust with `dotnet dev-certs https --trust` and accept dialog
3. Set the following environment variables in `./docker-compose.yml`
   - SALESFORCE_CLIENT_ID
   - SALESFORCE_SECRET
   - SALESFORCE_CALLBACK_URL
   - ASPNETCORE_URLS: https://+;http://+
   - ASPNETCORE_Kestrel**Certificates**Default\_\_Password: INSERT_YOUR_PASSWORD
   - ASPNETCORE_Kestrel**Certificates**Default\_\_Path: /https/aspnetapp.pfx

_Note: Make sure your certificate was created in the same directory as `docker-compose.yaml` volume mapping `C:\tmp:/https:ro`_

## Authors

- [@agonzalezdev](https://www.github.com/agonzalezdev)
