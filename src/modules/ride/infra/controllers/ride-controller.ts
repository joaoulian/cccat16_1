import { HttpServer } from "../../../shared/infra/http/http-server";
import { AcceptRide } from "../../application/use-cases/accept-ride";
import { GetRide } from "../../application/use-cases/get-ride";
import { RequestRide } from "../../application/use-cases/request-ride";
import { StartRide } from "../../application/use-cases/start-ride";

export class RideController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly getRide: GetRide,
    private readonly requestRide: RequestRide,
    private readonly acceptRide: AcceptRide,
    private readonly startRide: StartRide
  ) {
    this.httpServer.register(
      "post",
      "/accept-ride",
      async (_params: any, body: any) => {
        return this.acceptRide.execute(body);
      }
    );
    this.httpServer.register(
      "post",
      "/request-ride",
      async (_params: any, body: any) => {
        return this.requestRide.execute(body);
      }
    );
    this.httpServer.register(
      "post",
      "/start-ride",
      async (_params: any, body: any) => {
        return this.startRide.execute(body);
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
