# mongo-replica-set

A docker compose file for a mongodb replica set 

**Table of Contents**

<!-- !toc (omit="mongo-replica-set") -->

* [Setup](#setup)
* [Start](#start)
* [Stop](#stop)
* [License](#license)

<!-- toc! -->


# Setup

1. Clone the project
    ```sh
    git clone ...
    cd mongo-replica-set
    ```

2. Copy the `env` file
    ```sh
    cp env .env
    ```

3. Set all the passwords `*_PASSWORD` and name your database in
   `MONGO_DB_NAME`
4. Create a replica-set-key in `setup/replset.key`
    ```sh
    ./scripts/replset-key.sh
    ```

# Start

1. Startup the mongo databases
    ```sh
    docker-compose up -d
    # check the logs 
    docker-compose logs -f
    ```

# Stop

1. Stop the database cluster
    ```sh
    docker-compose down
    ```

2. If you want to delete all volumes created
    ```sh
    ./scripts/rm-volumes.sh
    ```

# Troubleshooting

In some cases the replica-set does not start on its own. Make sure you have set all passwords and the file in `setup/replset.key`.
Stop the cluster and delete all volumes.

You can also repeatedly start the init container with: 
```sh
docker-compose start mongoInit
```

# License

[Unlicense](https://unlicense.org)

---
