# Serverless React App Workshop

This workshop is designed to help you start building [Serverless](https://martinfowler.com/articles/serverless.html) [React](https://reactjs.org/) Apps using the ```AWS``` services. The main goal is for you to have the full infrastructure running on your local setup to easily develop and test.

![Architecture](architecture.png)

For simplification purposes we will be creating a basic **Contact Us** application. The application will be implemented using a [3 Tier Architecture](https://en.wikipedia.org/wiki/Multitier_architecture#Three-tier_architecture):
- **Presentation** using [ReactJS](https://reactjs.org/)
This tier is also known as Front-end.
  - A page with a contact form with a name, email and message.
  - A page with a list of received contacts.
- **Logic** using [AWS Lambda](https://aws.amazon.com/lambda/)
This tier is also known as Back-end.
  - Two endpoints for submitting the form and reading all contacts. 
- **Data** using [AWS DynamoDB](https://aws.amazon.com/dynamodb/) and [AWS DynamoDB-local](https://hub.docker.com/r/amazon/dynamodb-local/)
This tier is also known as Persistency.
  - A database to store all contacts.

### What will not be covered (for now)
- Authentication
- Authorization
- Deployment to AWS

## Table of Contents

- [Pre-requisites](#pre-requisites)
- [Running locally](#running-locally)
- [Essentials](#essentials)

## Pre-requisites

You should be familiar with the Composition Pattern because React recommends it. Please have a look at the [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html) page from the React docs. 

Although we will not cover deployment into AWS in this workshop, **you still need to create** an [AWS Free Tier](https://aws.amazon.com/free/) account in order to use the local stack.

After creating your account and installing the software from the [Logic](#logic) section, please run the following command to configure your local default settings:

```
aws configure
```

### Presentation

For the presentation tier we will be using:
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on [Chrome's V8 JavaScript engine](https://developers.google.com/v8/).
- [Bootstrap](https://getbootstrap.com/) - A front-end component library.
- [npm 5.2+](https://www.npmjs.com/) - Package manager and software registry for JavaScript.

Via npm (already in package.json):
  - [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [React Router](https://github.com/ReactTraining/react-router) - Declarative routing for React.
  - [React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) - DOM bindings for React Router.
  - [cross-env](https://github.com/kentcdodds/cross-env) - Set and use environment variables across platforms.

### Logic

For the backend tier we will be using:
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on [Chrome's V8 JavaScript engine](https://developers.google.com/v8/).
- [Docker](https://www.docker.com/get-started) - Runtime virtualization using containers.
- [AWS cli](https://github.com/aws/aws-cli) - Unified command line interface to Amazon Web Services.
- [AWS SAM](https://aws.amazon.com/serverless/sam/#Install_SAM_CLI) - An open-source framework for building serverless applications in AWS.

Via npm (already in package.json):
- [AWS SDK](https://github.com/aws/aws-sdk-js) - AWS SDK for JavaScript.
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.

### Data

For the data tier we will be using:
- [Docker](https://www.docker.com/get-started) - Runtime virtualization using containers.
- [DynamoDB](https://aws.amazon.com/dynamodb/) - A fast and flexible NoSQL database service for any scale. 
- [DynamoDB local](https://hub.docker.com/r/amazon/dynamodb-local/) - A downloadable version of [DynamoDB](https://aws.amazon.com/dynamodb/) that enables developers to develop and test applications using a version of DynamoDB running in your own development environment.
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on [Chrome's V8 JavaScript engine](https://developers.google.com/v8/).
- [npm 5.2+](https://www.npmjs.com/) - Package manager and software registry for JavaScript.

Via npm (already in package.json):
  - [AWS SDK](https://github.com/aws/aws-sdk-js) - AWS SDK for JavaScript.
  - [cross-env](https://github.com/kentcdodds/cross-env) - Set and use environment variables across platforms.

## Running Locally

To run this project in development mode you need to:
  1. clone the repository
      ```bash
      git clone https://github.com/rafaelspinto/workshop-serverless-react-app
      ```
  2. if you are using Linux or MacOS you can run the start.sh script at the root of the project:

      ```bash 
      ./start.sh
      ```
  or

  2. start the 3 tiers independently (using the following commands):

  - Starting the Presentation tier
    ```bash
    cd presentation
    npm install # only required in the first time
    npm start
    ```

  - Starting the Logic tier
    ```bash
    cd logic
    cd handlers; npm install; cd .. # only required in the first time
    sam local start-api --docker-network lambda-local
    ```

  - Starting the Data tier
    ```bash
    docker run -d --rm --name dynamodb-local --network lambda-local -p 8000:8000 amazon/dynamodb-local
    cd data 
    npm install # only required in the first time
    npm run create-local-db
    ```

  3. Stopping the Data tier

      ```
      docker stop dynamodb-local
      ```

## Essentials

### Code changes

The tools used here support hot reloading, which means that everytime you change the code it will automatically be reflected on the local application.

**Note:** changes to the SAM template.yaml file will only be reflected when you restart the ```sam local start-api...``` command.


### AWS

- You need at least an [AWS Free Tier](https://aws.amazon.com/free/) account in order to use the local or cloud stack.
- To configure locally your AWS account run the command ```aws configure```:
  - Credentials will be stored in ```~/.aws/credentials```and are a set of ```access_key_id``` + ```secret_access_key```.
  - Configuration will be stored in ```~/.aws/config```and requires at least the region.

### Docker

- A local docker network called ```lambda-local``` needs to be created to easily support communication between ```lambda``` and ```dynamodb```.

### JavaScript

- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) are a mechanism used to support asynchronous operations, that gives you ```resolve``` and ```reject``` functions to handle the result after it was processed. A good example of this is the [axios](https://github.com/axios/axios) http client:

  
  ```javascript
  axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  ```

### ReactJS

[ReactJS](https://reactjs.org/)

- Composition over Inheritance, see [Composition vs Inheritance](https://reactjs.org/docs/composition-vs-inheritance.html).
- Updates and renders the right components on data change.
- JSX syntax (xml-like):
```jsx
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}
```
- ***props*** holds the Component attributes.
- ***state*** holds the Component state.
- **MUST** know methods:
   - ```render()``` - defines how a Component shall be rendered.
   - ```componentWillMount()``` - perform actions before component is mounted (e.g.: fetch data)
   - ```componentWillUnmount()```  - perform actions before component unmounted (e.g.: clear timers)
- It is configured to run locally at **Port 3001** 

### AWS Lambda

[AWS Lambda](https://aws.amazon.com/lambda/)

- Local usage is possible with the docker image [lambci/lambda:nodejs8.10](https://github.com/lambci/docker-lambda).
- It is configured to run locally at **Port 3000** 

### AWS Serverless Application Model (SAM)

[AWS SAM](https://aws.amazon.com/serverless/sam/#Install_SAM_CLI)

- Relies on a file called ```template.yaml``` that specifies the Resources (Functions, Database, APIs, etc). This is an extension to [CloudFormation](https://aws.amazon.com/cloudformation/).
- Has a command line tool ```sam``` that uses the ```aws-cli``` as a base.

### AWS DynamoDB

[DynamoDB](https://aws.amazon.com/dynamodb/)

- Local usage is possible with the docker image [amazon/dynamodb-local](https://hub.docker.com/r/amazon/dynamodb-local/).
- It is configured to run locally at **Port 8000**

### Cross-Origin Resource Sharing (CORS)

[Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

For security reasons, browsers restrict HTTP requests initiated from within scripts.