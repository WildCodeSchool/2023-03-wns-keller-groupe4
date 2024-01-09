# Fixture Setup and Usage Guide

## Overview

This guide provides instructions for launching fixtures in the project using Docker Compose. Fixtures are scripts that populate the development database with mock data, facilitating a realistic testing environment. Developers can customize the fixture behavior based on their needs.

### Launch Commands :

- `docker compose up --build`: Build and run the containers
- `docker compose up`: Run the containers

### Prerequisites

Docker and Docker Compose installed on your machine.

### Launching Fixtures

The flags (DATA_FIXTURE_CATEGORIES, DATA_FIXTURE_PRODUCTS, DATA_FIXTURE_USERS, ALL_DATA_FIXTURES) control which fixtures will be executed.

The --build flag ensures that Docker Compose builds the backend service so that no memory of previous fixtures is conflicting with the ones in process

Observe the terminal for log messages indicating the progress of the fixture process.

exemple :

Run the following Docker Compose command

`DATA_FIXTURE_CATEGORIES=true docker compose up --build`

Monitor Logs:

Example log messages:

`resetMockCategories is true `

## Fixture Details:

### Categories:

`DATA_FIXTURE_CATEGORIES=true docker compose up`, mock categories will be created or reset. This commands also resets all DB because product are tied to categories and reservations
Products:

### Products

- `DATA_FIXTURE_PRODUCTS=true docker compose up`: Run the containers and load the product fixtures, reservations will also be refreshed since product and reservation are linked.

### Users:

- `DATA_FIXTURE_USERS=true docker compose up`: Run the containers and load the users fixtures, mock users and associated reservations will be created.

### Resetting all Data

To reset all mock data, including categories, products, users and user category set ALL_DATA_FIXTURES=true in your docker compose cmd

`ALL_DATA_FIXTURES=true docker compose up`

For a clean slate (removing volumes), run:

`docker-compose down -v`

### Customization

To customize mock data, modify the mockDataArray.ts file in the src directory.

Adjust the mockdataArray in the mockDataArray.ts file and the mockdataFixture function in the fixture.ts file.

### Additional Notes

This guide explains how to launch fixtures, customize data, and provides details on the data creation and deletion processes.

## Test End-to-End

### Launch Commands :

- `ALL_DATA_FIXTURES=true docker-compose -f docker-compose.e2e.yml up --build --exit-code-from e2e`: Run the e2e tests
