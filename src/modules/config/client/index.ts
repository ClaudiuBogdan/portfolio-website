import { getEnvVar } from "../utils"

type ClientConfig = {
  env: string
  baseUrl: string
}

// Remap NEXT_PUBLIC_VERCEL_URL to NEXT_PUBLIC_SITE_URL in the vercel pipeline. At the moment, is not possible to remap the in the vercel dashboard
const vercelUrl = getEnvVar("NEXT_PUBLIC_VERCEL_URL", "") || undefined

export const clientConfig: ClientConfig = {
  env: getEnvVar("NODE_ENV", "development"),
  baseUrl: getEnvVar("NEXT_PUBLIC_SITE_URL", vercelUrl),
}
