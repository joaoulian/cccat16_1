import { PaymentGateway } from "../../application/gateway/payment-gateway";

export class PaymentGatewayMemoryImpl implements PaymentGateway {
  async processPayment(
    rideId: string,
    amount: number
  ): Promise<{ status: "success" | "failed" }> {
    console.log({ rideId, amount });
    return { status: "success" };
  }
}
