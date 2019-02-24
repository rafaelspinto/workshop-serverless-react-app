const headers = require('./headers')

exports.cors = async (events, context) => {
    return {
        'headers': headers,
        'statusCode': 200
    }
}