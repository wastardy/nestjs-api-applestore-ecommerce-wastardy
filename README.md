## Docker 🐳

### To run a PostgreSQL database container for the project, use the following command:

```bash
docker run --name applestore_db \
-p 5433:5432 \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=applestore_db \
-v apple_db_data:/var/lib/postgresql/data \
-d postgres
```

### To verify that the PostgreSQL container is up and running, execute `docker ps`

> You will see smth like this:

```bash
wastardy@flowerPot sasscribe_nest % docker ps

CONTAINER ID        IMAGE           COMMAND                       CREATED
836148e5f660        postgres        "docker-entrypoint.s…"        7 minutes ago


STATUS              PORTS                         NAMES
Up 7 minutes        0.0.0.0:5433->5432/tcp        applestore_db
```
