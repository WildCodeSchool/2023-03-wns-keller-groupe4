### Launch Commands :

- `docker compose up --build`: Build and run the containers
- `docker compose up`: Run the containers
- `DATA_FIXTURE_CATEGORIES=true docker compose up`: Run the containers, delete DB and load the categories fixtures
- `DATA_FIXTURE_PRODUCTS=true docker compose up`: Run the containers and load the products fixtures
- `DATA_FIXTURE_USERS=true docker compose up`: Run the containers and load the users fixtures
- `DATA_FIXTURE_CATEGORIES=true DATA_FIXTURE_PRODUCTS=true DATA_FIXTURE_USERS=true docker compose up`: Run the containers, delete DB and load all the fixtures
