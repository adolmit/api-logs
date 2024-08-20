export interface Now {
  provider: string;
  httpMethod: string;
  statusCode: number;
  uriPath: string;
  time: number;
  responseSize: number;
  cacheStatus: string;
}
