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

exports.get = (event, context, callback) => {
    return getAllContacts(callback)
};

function getAllContacts(callback) {
    var ddb = new AWS.DynamoDB.DocumentClient()
    var params = {
        TableName: tableName
    };

    ddb.scan(params, function (err, data) {
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
                body: JSON.stringify(data.Items)
            }
            )
        }
    });
}