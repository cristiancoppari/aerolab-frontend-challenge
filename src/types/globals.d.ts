/**
 * https://www.totaltypescript.com/how-to-strongly-type-process-env
 */

declare namespace NodeJS {
  interface ProcessEnv {
    IGDB_CLIENT_ID: string;
    IGDB_CLIENT_SECRET: string;

    UPSTASH_REDIS_REST_URL: string;
    UPSTASH_REDIS_REST_TOKEN: string;

    API_URL: string;
  }
}
