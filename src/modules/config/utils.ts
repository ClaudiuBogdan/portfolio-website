export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name] || defaultValue

  if (value === undefined) {
    throw new Error(
      `Environment variable ${name} is not defined and no default value was provided`
    )
  }

  return value
}
