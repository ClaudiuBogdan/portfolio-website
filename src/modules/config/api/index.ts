import { getEnvVar } from "../utils"

type ApiConfig = {
  env: string
  mailchimp: {
    apiKey: string
    serverPrefix: string
    listId: string
  }
}

export const apiConfig: ApiConfig = {
  env: getEnvVar("NODE_ENV", "development"),
  mailchimp: {
    apiKey: getEnvVar("MAILCHIMP_API_KEY"),
    serverPrefix: getEnvVar("MAILCHIMP_SERVER_PREFIX"),
    listId: getEnvVar("MAILCHIMP_LIST_ID"),
  },
}
