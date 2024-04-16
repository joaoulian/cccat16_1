import express from "express";
import { HttpServer } from "./http-server";

export class HttpServerExpressAdapter implements HttpServer {
  private readonly app: any;

  constructor() {
    const express = require("express");
    this.app = express();
    this.app.use(express.json());
  }

  listen(port: number): void {
    this.app.listen(port);
  }

  register(
    method: string,
    path: string,
    handler: (params: any, body: any) => Promise<any>
  ): void {
    this.app[method](path, async (req: any, res: any) => {
      try {
        const response = await handler(req.params, req.body);
        return res.json(response);
      } catch (error: any) {
        return this.fail(res, error.message ?? "Unexpected error");
      }
    });
  }

  fail(res: express.Response, message: string) {
    return res.status(422).send({
      message,
    });
  }
}
