import AWS from "aws-sdk";
import fs from "fs";

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: "ap-southeast-1",
});

const TABLE_NAME = "grammieTable"; // replace with your actual table name

// Read your JSON file
const items = JSON.parse(fs.readFileSync("temiar_words_dynamodb.json", "utf-8"));

// Upload in batches
async function uploadBatches(items) {
  const BATCH_SIZE = 25;
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const params = {
      RequestItems: {
        [TABLE_NAME]: batch.map((item) => ({ PutRequest: { Item: item } })),
      },
    };

    try {
      await dynamodb.batchWrite(params).promise();
      console.log(`✅ Uploaded batch ${Math.floor(i / BATCH_SIZE) + 1}`);
    } catch (error) {
      console.error("❌ Error in batchWrite:", error);
    }
  }
  console.log("🎉 All items uploaded!");
}

uploadBatches(items);
