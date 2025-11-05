// Importing the Client class from @upstash/workflow package
// "as WorkflowClient" means we are renaming Client → WorkflowClient for clarity
import { Client as WorkflowClient } from "@upstash/workflow";


// Importing our QStash credentials (URL + Token) from env.js file
// These are secret values required to connect with Upstash QStash service
import { QSTASH_TOKEN, QSTASH_URL } from "./env.js";


// Creating a new WorkflowClient instance to talk to QStash
// - baseUrl: the API endpoint of QStash
// - token: our secret token for authentication
// This client will be used everywhere in our app to schedule or manage workflows
export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN
})