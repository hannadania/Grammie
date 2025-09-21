const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "grammieDynamoDBTable-dev"; // Hardcoded table name

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
            demiar: body.demiar,
            msg: body.msg,
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
      const result = await dynamoDB
        .scan({ TableName: TABLE_NAME }) // ✅ use TABLE_NAME env variable
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ items: result.Items }),
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
