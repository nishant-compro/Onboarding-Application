const AWS = require('aws-sdk');

const dyDb = new AWS.DynamoDB.DocumentClient({ region: 'ap-south-1' });

exports.handler = async (event) => {
  let body = event;
  let statusCode = 200;
  console.log('lambda invoked', event);

  if (event.path === '/task') {
    switch (event.httpMethod) {
      case 'GET':
        if (event.queryStringParameters) {
          const { id, created_at: createdAt } = event.queryStringParameters;
          body = await dyDb.get({
            TableName: 'Task',
            Key: {
              id,
              created_at: createdAt,
            },
          }).promise();
        } else {
          body = await dyDb.scan({
            TableName: 'Task',
          }).promise();
        }
        statusCode = 200;
        break;

      case 'POST':
      {
        const { id, title, assignee } = JSON.parse(event.body);
        const params = {
          TableName: 'Task',
          Item: {
            id,
            created_at: Date.now().toString(),
            title,
            assignee,
          },
        };
        await dyDb.put(params).promise();
        statusCode = 200;
        break;
      }
      case 'PUT':
      {
        const {
          id,
          created_at: createdAt,
          title,
          assignee,
        } = JSON.parse(event.body);
        const params = {
          TableName: 'Task',
          Item: {
            id,
            created_at: createdAt,
            title,
            assignee,
          },
        };
        await dyDb.put(params).promise();
        statusCode = 200;
        break;
      }
      case 'DELETE':
      {
        const { id, created_at: createdAt } = event.queryStringParameters;
        body = await dyDb.delete({
          TableName: 'Task',
          Key: {
            id,
            created_at: createdAt,
          },
        }).promise();
        statusCode = 200;
        break;
      }
      default:
        break;
    }
  }
  if (event.path === '/tasks') {
    if (event.httpMethod === 'GET') {
      body = await dyDb.scan({
        TableName: 'Task',
      }).promise();
    }
  }
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
