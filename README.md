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



### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
