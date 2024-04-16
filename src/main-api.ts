import pgp from "pg-promise";
import { SignUp } from "./modules/identity/application/use-cases/sign-up";
import { AccountRepositoryPostgresImpl } from "./modules/identity/infra/repositories/account-repository-postgres-impl";
import { AccountController } from "./modules/identity/infra/controllers/account-controller";
import { HttpServerExpressAdapter } from "./modules/shared/infra/http/http-server-express-adapter";
import { GetAccount } from "./modules/identity/application/use-cases/get-account";

const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
const httpServer = new HttpServerExpressAdapter();
const accountRepository = new AccountRepositoryPostgresImpl(connection);
const signUp = new SignUp(accountRepository);
const getAccount = new GetAccount(accountRepository);
new AccountController(httpServer, signUp, getAccount);
httpServer.listen(3000);
