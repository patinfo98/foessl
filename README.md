# Continuous Delivery Project
Goal of the application is the setup of a simple blog page taking continuous delivery into consideration. 

## Used technologies
- Frontend
    - Next.js [Starter Guide](./frontend/blog/README.md)
    - Tailwind 
- Backend 
    - Strapi [Starter Guide](./backend/README.md)
    - SQLite Database

## Local startup
1) Backend
    - cd foessl/backend
    - cp .env.example .env
    - npm install
    - npm run develop
    - insert local testdata via strapi gui to test application 
        - add one category
        - add one blog with relation to this category
        - go to settings roles public and allow find and findOne on category and blog
2) Frontend
    - cd foessl/frontend/blog
    - npm install
    - npm run dev

## Build Automation and Containerization
In this project two docker containers are built: one for the frontend and one for the backend. They can however communicate over a shared network. In the github workflow [build.yml](./.github/workflows/build.yml) both containers are initialized from their dockerfiles ([backend dockerfile](./backend/Dockerfile), [frontend dockerfile](./frontend/blog/Dockerfile)), including the necessary enviroment variables. After building the containers both are started to check wether the backend and frontend are accessible on their adresses. The workflow runs everytime when someone tries to interact with the main branch, not on seperate branches there, only simple tests are done.

## Test Automation
As in the build automation seperate tests for the frontend and backend are being used. Frontend is tested by mocking API Requests in a simple unit test fashion ([frontend tests](./frontend/blog/src/tests/api.test.ts)). For the backend tests are a little bit more complex and involve the correct setup of the content management system (set permissions on startup) to interact with the database. After the setup POST, PUT, GET, DELETE operations are tested ([backend tests](./backend/test/strapi_database.test.ts)). The [workflow](./.github/workflows/test.yml) that triggers these tests is run on each branch, since its very short and useful for initial feedback on the developers. 

## Automated Code Analysis
The frontend of the project is a next.js typescript application that uses strict linting and type safety to ensure adherence to clean coding guidelines. Some of the enforced rules are: no any types, no unused parameters in methods - this also leads to some problems with some packages and therefore annotations like @tsignore have to be used on occasion. 

## Security
All necessary keys are stored in Github Secrets and injected into the github workflows where necessary. Files like .env are not commited but ignored, however there is an example.env file to have some data for local testing.