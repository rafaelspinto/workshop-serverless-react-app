const AWS = require("aws-sdk");
AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB();
const params = {
    TableName: "Contacts",
    KeySchema: [
        { AttributeName: "email", KeyType: "HASH" },
        { AttributeName: "timestamp", KeyType: "RANGE" }
    ],
    AttributeDefinitions: [
        { AttributeName: "email", AttributeType: "S" },
        { AttributeName: "timestamp", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});