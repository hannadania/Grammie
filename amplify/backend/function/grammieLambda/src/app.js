/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const ddbClient = new DynamoDBClient({ region: "ap-southeast-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const bedrockClient = new BedrockRuntimeClient({ region: "us-east-1" });

let tableName = "grammieDynamoDBTable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = false; // TODO: update in case is required to use that definition
const partitionKeyName = "PK";
const partitionKeyType = "S";
const sortKeyName = "SK";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/grsmmie";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/************************************
* HTTP Get method to list objects *
************************************/

app.get(path, async function(req, res) {
  var params = {
    TableName: tableName,
    Select: 'ALL_ATTRIBUTES',
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }
});

/************************************
 * HTTP Get method to query objects *
 ************************************/

app.get(path + hashKeyPath, async function(req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, async function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  try {
    const data = await ddbDocClient.send(new GetCommand(getItemParams));
    if (data.Item) {
      res.json(data.Item);
    } else {
      res.json(data) ;
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({error: 'Could not load items: ' + err.message});
  }
});


/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, async function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.json({ success: 'put call succeed!', url: req.url, data: data })
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, async function(req, res) {
  console.log('=== DynamoDB POST Endpoint Called ===');
  console.log('URL:', req.url);
  console.log('Body:', req.body);

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    console.log('=== DynamoDB POST SUCCESS ===');
    res.json({ 
      success: 'DynamoDB item saved successfully!', 
      message: 'This is the DynamoDB POST endpoint, not Bedrock!',
      url: req.url, 
      data: data,
      warning: 'If you expected Bedrock, check your endpoint URL'
    })
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, async function(req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
     try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }

  try {
    let data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
    res.json({url: req.url, data: data});
  } catch (err) {
    res.statusCode = 500;
    res.json({error: err, url: req.url});
  }
});

/************************************
* HTTP post method for Bedrock chat *
*************************************/

app.post(path + '/bedrock-chat', async function(req, res) {
  console.log('=== Bedrock Chat Endpoint Called ===');
  console.log('Request body:', req.body);
  
  try {
    const { prompt } = req.body;
    console.log('Extracted prompt:', prompt);
    
    const input = {
      modelId: "openai.gpt-oss-120b-1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt || "Hello, how are you? Please respond with a test message to confirm Bedrock is working."
          }
        ],
        max_tokens: 1000,
        temperature: 0.5
      })
    };
    
    console.log('Bedrock input:', input);

    const command = new InvokeModelCommand(input);
    console.log('Sending command to Bedrock...');
    
    const response = await bedrockClient.send(command);
    console.log('Bedrock response received');
    
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    console.log('Parsed response body:', responseBody);
    
    res.json({
      success: 'Bedrock chat successful!',
      message: responseBody.choices[0].message.content,
      debug: {
        prompt: prompt,
        model: "openai.gpt-oss-120b-1:0",
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Bedrock chat error:', err);
    res.statusCode = 500;
    res.json({ 
      error: 'Bedrock chat failed: ' + err.message,
      debug: {
        stack: err.stack,
        timestamp: new Date().toISOString()
      }
    });
  }
});

/************************************
* HTTP GET test endpoint for Bedrock *
*************************************/

app.get(path + '/test-bedrock', async function(req, res) {
  console.log('=== Test Bedrock Endpoint Called ===');
  
  try {
    const testPrompt = "Say 'Hello from Bedrock!' to test the connection.";
    
    const input = {
      modelId: "openai.gpt-oss-120b-1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: testPrompt
          }
        ],
        max_tokens: 100,
        temperature: 0.5
      })
    };
    
    console.log('Test Bedrock input:', input);

    const command = new InvokeModelCommand(input);
    console.log('Sending test command to Bedrock...');
    
    const response = await bedrockClient.send(command);
    console.log('Test Bedrock response received');
    
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    console.log('Test parsed response body:', responseBody);
    
    res.json({
      success: 'Test Bedrock successful!',
      message: responseBody.choices[0].message.content,
      endpoints: {
        bedrock_chat: path + '/bedrock-chat',
        test_bedrock: path + '/test-bedrock',
        main_path: path
      },
      debug: {
        model: "openai.gpt-oss-120b-1:0",
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Test Bedrock error:', err);
    res.statusCode = 500;
    res.json({ 
      error: 'Test Bedrock failed: ' + err.message,
      endpoints: {
        bedrock_chat: path + '/bedrock-chat',
        test_bedrock: path + '/test-bedrock',
        main_path: path
      },
      debug: {
        stack: err.stack,
        timestamp: new Date().toISOString()
      }
    });
  }
});

/************************************
* Debug endpoint to show all routes *
*************************************/

app.get(path + '/debug-routes', function(req, res) {
  console.log('=== Debug Routes Endpoint Called ===');
  console.log('Base path:', path);
  console.log('Full URL:', req.url);
  console.log('Method:', req.method);
  
  res.json({
    message: 'Debug endpoint working!',
    available_endpoints: {
      get_all_items: `GET ${path}`,
      get_food_items: `GET ${path} (configured for food topic)`,
      save_item_to_db: `POST ${path}`,
      bedrock_chat: `POST ${path}/bedrock-chat`,
      test_bedrock: `GET ${path}/test-bedrock`,
      debug_routes: `GET ${path}/debug-routes`
    },
    current_request: {
      url: req.url,
      method: req.method,
      base_path: path
    },
    instructions: {
      for_bedrock: `POST to ${path}/bedrock-chat with {"prompt": "your message"}`,
      for_testing: `GET ${path}/test-bedrock`
    }
  });
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
