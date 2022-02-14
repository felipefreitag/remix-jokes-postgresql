# Remix Jokes tutorial with Postgresql on Heroku

- [Remix Docs](https://remix.run/docs)

## See it live

https://remix-jokes-postgres.herokuapp.com/

## Development

#### Install dependencies
```sh
npm install
```

#### Create a `jokes` db on your local Postgresql server.
```
psql
> CREATE DATABASE jokes;
```

#### Prepare .env
```sh
cp .env.sample .env
```
Add the DB URL and any string for the session secret.

#### Migrate db
```
npx prisma migrate
```

#### (Optional) Seed db
```
npx prisma db seed
```

#### Run
```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

Create a Heroku app, provision any Heroku pg plan and deploy.

```sh
heroku apps:create
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```