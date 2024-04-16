export interface HttpServer {
  listen(port: number): void;
  register(
    method: string,
    path: string,
    handler: (params: any, body: any) => Promise<any>
  ): void;
}
