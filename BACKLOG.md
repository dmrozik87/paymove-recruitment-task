## APP IDEA
The application allows users to submit suggestions for improvements in the company in which they work.

## USER STORIES
- user can create an account by providing a username, e-mail address and password
- default user role is "submitter" (a person who submits improvement proposals)
- user role can be changed by admin to "reviewer" (a person who review submitted improvement proposals)
- submitter can submit improvement proposal
- reviewer can review improvement proposals: he can approve, reject or send it for correction
- admin can change users roles

## BACKLOG

23.01.2024
- create project structure: 3 pts.
  - initialize Spring Boot project for backend,
  - add required dependencies
  - create React project for frontend, 
  - create PostgreSQL database and connect it to backend,
  - create local repository tracked with Git
  - create remote repository on GitHub
  - connect local and remote repositories
- create User entity: 1 pt.

24.01.2024
- create backend part necessary to register and login user: 8 pts.
  - create register endpoint
  - create authenticate endpoint
  - create models for register and authentication requests and responses
  - configure security