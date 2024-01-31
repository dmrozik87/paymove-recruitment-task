## APP IDEA

The application allows users to submit suggestions for improvements in the company in which they work.

## USER STORIES

- user can create an account by providing a username, e-mail address and password
- default user role is "submitter" (a person who submits improvement proposals)
- user role can be changed by admin to "reviewer" (a person who reviews submitted improvement proposals)
- submitter can submit improvement proposal
- reviewer can review improvement proposals: he can comment and approve, reject or send it for correction
- improvement proposals sent for correction can be corrected and resubmitted by submitter
- admin can change users roles

## BACKLOG

#### 23.01.2024

- create project structure: 3 pts.
    - initialize Spring Boot project for backend,
    - add required dependencies
    - create React project for frontend,
    - create PostgreSQL database and connect it to backend,
    - create local repository tracked with Git
    - create remote repository on GitHub
    - connect local and remote repositories
- create User entity: 1 pt.

#### 24.01.2024

- create backend part necessary to register and login user: 8 pts.
    - create register endpoint
    - create authenticate endpoint
    - create models for register and authentication requests and responses
    - configure security

#### 25.01.2024

- create simple frontend with registration and login forms communicating with backend endpoints: 3 pts.
- create dashboard mockups for each role and configure routing: 2 pts.
- create endpoints for admin: 2 pts.
    - getting all users
    - changing user role
- create frontend for admin panel: 1 pt.
    - create table with users
    - allow to change user roles and persist change in DB

#### 26.01.2024

- create ImprovementProposal and Comment entities: 1 pt.
- create endpoints: 2 pts.
    - to create IP
    - to get IP by userId
    - to get IP by ipId
    - to delete IP
    - to get IPs for reviewer
- create frontend: 5 pts.
    - submitter dashboard
    - submitter IP view

#### 29.01.2024

- create frontend: 3 pts.
    - reviewer dashboard
    - reviewer IP view

#### 30.01.2024

- create endpoints: 2 pts.
    - to create comment
    - to get comments by ipId
- create frontend for comment section: 4 pts.
- update IP status change logic: 2 pts.

#### 31.01.2024

- create modals to: 1 pts.
    - display message to a user during login if credentials are invalid
    - display message to a user during registration if name or email are already taken

#### TODO:

- create README.md
- registration form validation on frontend 4 pts.

