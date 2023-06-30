import { getEnvVar } from "../utils"

type ClientConfig = {
  env: string
  baseUrl: string
}

export const clientConfig: ClientConfig = {
  env: getEnvVar("NODE_ENV", "development"),
  baseUrl: getEnvVar("NEXT_PUBLIC_SITE_URL"),
}
