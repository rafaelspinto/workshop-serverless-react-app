const AWS = require('aws-sdk')
const headers = require('./headers')
var tableName = process.env.TABLE_NAME

// local environment
if(process.env.IS_LOCAL == true) {
    AWS.config.update({
        region: process.env.DB_REGION,
        endpoint: process.env.DB_ENDPOINT
    });
    tableName = process.env.LOCAL_TABLE_NAME
}

exports.submit = (event, context, callback) => {
    const data = JSON.parse(event.body)
    return saveContact(data.name, data.email, data.message, callback)
};

function saveContact(name, email, message, callback) {
    var ddb = new AWS.DynamoDB.DocumentClient()
    var params = {
        TableName: tableName,
        Item: {
            'name': name,
            'email': email,
            'message': message,
            'timestamp': new Date().getTime()
        }
    };
    ddb.put(params, function (err, data) {
        if (err) {
            callback(err, {
                headers: headers,
                statusCode: 500,
                body: err
            })
        } else {
            callback(null, {
                headers: headers,
                statusCode: 200,
                body: 'OK'
            })
        }
    });
}