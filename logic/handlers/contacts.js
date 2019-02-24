const AWS = require('aws-sdk')
const headers = require('./headers')

AWS.config.update({
    region: process.env.DB_REGION,
    endpoint: process.env.DB_ENDPOINT
});

exports.get = (event, context, callback) => {
    return getAllContacts(callback)
};

function getAllContacts(callback) {
    var ddb = new AWS.DynamoDB.DocumentClient();;
    var params = {
        TableName: "Contacts"
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