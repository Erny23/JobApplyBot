export const parseArrayEnv = (
  env: string | undefined,
  separator: string = ","
): string[] => {
  if (!env) {
    return [];
  }
  return env.split(separator);
};
