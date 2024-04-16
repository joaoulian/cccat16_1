import { HttpServer } from "../../../shared/infra/http/http-server";
import { GetAccount } from "../../application/use-cases/get-account";
import { SignUp } from "../../application/use-cases/sign-up";

export class AccountController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly signUp: SignUp,
    private readonly getAccount: GetAccount
  ) {
    this.httpServer.register(
      "post",
      "/signup",
      async (_params: any, body: any) => {
        return this.signUp.execute(body);
      }
    );
    this.httpServer.register(
      "get",
      "/account/:accountId",
      async (params: any, _body: any) => {
        return this.getAccount.execute({ accountId: params.accountId });
      }
    );
  }
}
