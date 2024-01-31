# Paymove Recruitment Task Application - Improvement Proposal


## Project Description


"Improvement Proposal" is an application intended for companies, enterprises, factories, etc. that would like to enable employees to submit various types of improvement proposals in an organized way. It allows employees to submit suggestions for improvements and have them assessed by reviewers.

It is an application created for the Paymove recruitment process.

## Features

- User can create account and login to application
- Application has 3 types of users: Admin, Submitters and Reviewers
- Improvement Proposals are created by Submitters and then evaluated by Reviewers
- Improvement Proposals may be at different stages: pending submission, submitted, in review, needs update, resubmitted, completed, rejected
- Submitters and Reviewers have their own Dashboards where they can view Improvement Proposals divided into sections depending on the status
- Submitters and Reviewers can communicate through built-in comments section
- Admin can change user roles
- All requests (except login and registration) must be authorized by JWT

## Technologies
- Spring Boot
- Spring Data
- Spring Security
- PostgreSQL
- React
- Bootstrap

## Screenshots

#### Improvement Proposal view with comments:

![IP view with comments]()

#### Submitter Dashboard:

![Submitter Dashboard]()

#### Reviewer Dashboard:

![Reviewer Dashboard]()

#### Admin Dashboard:

![Admin Dashboard]()