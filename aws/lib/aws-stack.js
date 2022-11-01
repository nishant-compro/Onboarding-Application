const { Stack } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const dynamoDB = require('aws-cdk-lib/aws-dynamodb');
const apiGateway = require('aws-cdk-lib/aws-apigateway');
const iam = require('aws-cdk-lib/aws-iam');

class AwsStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const taskLambda = new lambda.Function(this, 'task-lambda', {
      code: lambda.Code.fromAsset('src/functions'),
      functionName: 'Task',
      handler: 'task.handler',
      runtime: lambda.Runtime.NODEJS_16_X,
    });

    const taskTable = new dynamoDB.Table(this, 'task-table', {
      partitionKey: {
        name: 'id',
        type: dynamoDB.AttributeType.STRING,
      },
      readCapacity: 1,
      sortKey: {
        name: 'created_at',
        type: dynamoDB.AttributeType.STRING,
      },
      tableName: 'Task',
      writeCapacity: 1,
    });

    const deptTable = new dynamoDB.Table(this, 'dept-table', {
      partitionKey: {
        name: 'id',
        type: dynamoDB.AttributeType.STRING,
      },
      readCapacity: 1,
      sortKey: {
        name: 'name',
        type: dynamoDB.AttributeType.STRING,
      },
      tableName: 'Department',
      writeCapacity: 1,
    });

    // taskTable.grantReadWriteData(taskLambda);
    taskLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['dynamodb:BatchGetItem',
          'dynamodb:BatchWriteItem',
          'dynamodb:ConditionCheckItem',
          'dynamodb:DeleteItem',
          'dynamodb:DescribeTable',
          'dynamodb:GetItem',
          'dynamodb:GetRecords',
          'dynamodb:GetShardIterator',
          'dynamodb:PutItem',
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:UpdateItem'],
        resources: [taskTable.tableArn],
      }),
    );

    const taskAPI = new apiGateway.LambdaRestApi(this, 'task-api', {
      handler: taskLambda,
      proxy: false,
      restApiName: 'Task API',
    });

    taskAPI.root.addResource('tasks').addMethod('GET');
    const taskApiResource = taskAPI.root.addResource('task');
    taskApiResource.addMethod('GET');
    taskApiResource.addMethod('POST');
    taskApiResource.addMethod('PUT');
    taskApiResource.addMethod('DELETE');
  }
}

module.exports = { AwsStack };
