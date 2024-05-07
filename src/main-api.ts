import pgp from "pg-promise";
import { SignUp } from "./modules/identity/application/use-cases/sign-up";
import { AccountRepositoryPostgresImpl } from "./modules/identity/infra/repositories/account-repository-postgres-impl";
import { AccountController } from "./modules/identity/infra/controllers/account-controller";
import { HttpServerExpressAdapter } from "./modules/shared/infra/http/http-server-express-adapter";
import { GetAccount } from "./modules/identity/application/use-cases/get-account";
import { RideController } from "./modules/ride/infra/controllers/ride-controller";
import { RideRepositoryPostgresImpl } from "./modules/ride/infra/repositories/ride-repository-postgres-impl";
import { GetRide } from "./modules/ride/application/use-cases/get-ride";
import { RequestRide } from "./modules/ride/application/use-cases/request-ride";

const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
const httpServer = new HttpServerExpressAdapter();
// Repositories
const accountRepository = new AccountRepositoryPostgresImpl(connection);
const rideRepository = new RideRepositoryPostgresImpl(connection);
// Use-cases
const signUp = new SignUp(accountRepository);
const getAccount = new GetAccount(accountRepository);
const getRide = new GetRide(rideRepository, accountRepository);
const requestRide = new RequestRide(rideRepository, accountRepository);
// Controllers
new AccountController(httpServer, signUp, getAccount);
new RideController(httpServer, getRide, requestRide);
httpServer.listen(3000);
