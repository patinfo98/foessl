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