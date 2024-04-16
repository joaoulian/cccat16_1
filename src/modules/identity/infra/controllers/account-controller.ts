import { HttpServer } from "../../../shared/infra/http/http-server";
import { SignUp } from "../../application/use-cases/sign-up";

export class AccountController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly signUp: SignUp
  ) {
    this.httpServer.register(
      "post",
      "/signup",
      async (_params: any, body: any) => {
        return this.signUp.execute(body);
      }
    );
  }
}
