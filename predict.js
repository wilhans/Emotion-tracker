require('dotenv').config()
// Imports the Google Cloud AutoML library
const {PredictionServiceClient} = require(`@google-cloud/automl`).v1;
// Instantiates a client
const client = new PredictionServiceClient();

// REQUIRED: project id, model id
const projectId = process.env.project_id;
const location = 'us-central1';
const modelId = process.env.model_id;

module.exports = async function predict(content) {
    // Construct request
    const request = {
        name: client.modelPath(projectId, location, modelId),
        payload: {
            textSnippet: {
                content: content,
                mimeType: 'text/plain', // Types: 'test/plain', 'text/html'
            },
        },
    };

    const [response] = await client.predict(request);

    const label = [];

    for (const annotationPayload of response.payload) {
        label.push({
            label: annotationPayload.displayName,
            score: annotationPayload.classification.score,
        })
    }
    
    return label
}