/**
 * https://www.totaltypescript.com/how-to-strongly-type-process-env
 */

namespace NodeJS {
  interface ProcessEnv {
    IGDB_CLIENT_ID: string;
    IGDB_CLIENT_SECRET: string;
  }
}
