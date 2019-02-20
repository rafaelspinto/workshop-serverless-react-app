# Serverless React App Workshop

This workshop is designed to help you start building [Serverless](https://martinfowler.com/articles/serverless.html) [ReactJS](https://reactjs.org/) Apps. For simplification purposes we will be creating a basic **Contact Us** application. The application will be implemented using a [3 Tier Architecture](https://en.wikipedia.org/wiki/Multitier_architecture#Three-tier_architecture):
- **Presentation** (aka Frontend)
  - A page with a contact form with a name, email and message.
  - A page with a list of received contacts.
- **Logic** (aka Backend)
  - Two endpoints for submitting the form and reading all contacts. 
- **Data** (aka Persistency)
  - A database to store all contacts.

## Pre-requisites

You should be familiar with the Composition Pattern because React recommends it. Please have a look at the [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html) page from the React docs. 

Although we will not cover deployment into AWS in this workshop, you still need to create an [AWS Free Tier](https://aws.amazon.com/free/) account in order to use the local stack. 

### Presentation

For the presentation tier we will be using:
- [npm 5.2+](https://www.npmjs.com/) - Package manager and software registry for JavaScript.
- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Bootstrap](https://getbootstrap.com/) - A front-end component library.
- [React Router](https://github.com/ReactTraining/react-router) - Declarative routing for React.
- [React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) - DOM bindings for React Router.

### Logic

For the backend tier we will be using:
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on [Chrome's V8 JavaScript engine](https://developers.google.com/v8/).
- [Docker](https://www.docker.com/get-started) - Runtime virtualization using containers.
- [AWS cli](https://github.com/aws/aws-cli) - Unified command line interface to Amazon Web Services.
- [AWS SAM](https://aws.amazon.com/serverless/sam/#Install_SAM_CLI) - An open-source framework for building serverless applications in AWS.

### Data

For the data tier we will be using:
- [Docker](https://www.docker.com/get-started) - Runtime virtualization using containers.
- [DynamoDB](https://aws.amazon.com/dynamodb/) - A fast and flexible NoSQL database service for any scale. 
- [DynamoDB local](https://hub.docker.com/r/amazon/dynamodb-local/) - A downloadable version of [DynamoDB](https://aws.amazon.com/dynamodb/) that enables developers to develop and test applications using a version of DynamoDB running in your own development environment.


## Running Locally

To run this project locally in development mode you need to clone the repository and start the 3 tiers independently (separate comand lines):


```
git clone https://github.com/rafaelspinto/workshop-serverless-react-app
```

#### Start Presentation tier
```
cd presentation
PORT=3001 npm start
```

#### Start Logic tier
```
cd logic
sam local start-api
```

#### Start Data tier
```
docker run -p 8000:8000 amazon/dynamodb-local
```

Now you can change every tier and see the changes immediatly due to hot reloading.

## 


## Creating a new Serverless App

[How to create a new serverless app](/create-a-new-serverless-app.md)