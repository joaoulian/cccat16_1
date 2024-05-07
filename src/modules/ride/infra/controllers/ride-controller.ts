import { HttpServer } from "../../../shared/infra/http/http-server";
import { GetRide } from "../../application/use-cases/get-ride";
import { RequestRide } from "../../application/use-cases/request-ride";

export class RideController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly getRide: GetRide,
    private readonly requestRide: RequestRide
  ) {
    this.httpServer.register(
      "post",
      "/request-ride",
      async (_params: any, body: any) => {
        return this.requestRide.execute(body);
      }
    );
    this.httpServer.register(
      "get",
      "/ride/:rideId",
      async (params: any, _body: any) => {
        return this.getRide.execute({ rideId: params.rideId });
      }
    );
  }
}
