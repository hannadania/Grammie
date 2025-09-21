const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "grammieTable"; // Use your custom table

exports.handler = async (event) => {
  console.log("Event received:", event);

  try {
    // --- POST request ---
    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body);

      await dynamoDB
        .put({
          TableName: TABLE_NAME,
          Item: {
            PK: body.PK || `TOPIC#${body.topic || 'general'}`,
            SK: body.SK || `WORD#${Date.now()}`,
            temiar: body.temiar || body.demiar,
            english: body.english || body.msg,
            topic: body.topic || 'general',
            english_match: body.english_match || body.english || body.msg,
            match_type: body.match_type || 'exact'
          },
        })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Item saved successfully!" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    // --- GET request ---
    else if (event.httpMethod === "GET") {
      let result;
      
      // Check if there's a topic query parameter
      if (event.queryStringParameters && event.queryStringParameters.topic) {
        const topic = event.queryStringParameters.topic;
        console.log(`Querying for topic: ${topic}`);
        
        // Query by topic using GSI or scan with filter
        result = await dynamoDB
          .scan({
            TableName: TABLE_NAME,
            FilterExpression: "topic = :topic",
            ExpressionAttributeValues: {
              ":topic": topic
            }
          })
          .promise();
      } else {
        // No filter - get all items
        result = await dynamoDB
          .scan({ TableName: TABLE_NAME })
          .promise();
      }

      // Transform the data to match your frontend expectations
      const transformedItems = result.Items.map(item => ({
        demiar: item.temiar || item.PK || 'unknown',
        msg: item.english || item.english_match || 'no translation',
        temiar: item.temiar,
        english: item.english,
        topic: item.topic,
        PK: item.PK,
        SK: item.SK
      }));

      return {
        statusCode: 200,
        body: JSON.stringify({ items: transformedItems }),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    // --- Unsupported method ---
    else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Unsupported method" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
