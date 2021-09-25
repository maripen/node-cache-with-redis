# Caching with Redis
### Search in the IMDB movie API, results will be cached in Redis.

## Run the application

```
   docker-compose up -d
```

## Tech Stack Used

- `Docker`
- `ExpressJS`
- `Redis`
- `NodeJS`
- `Axios`

## Search URL
```
curl http://localhost:3000/movies?search=<movie name>
```