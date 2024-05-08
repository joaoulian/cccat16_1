export interface PaymentGateway {
  processPayment(
    rideId: string,
    amount: number
  ): Promise<{ status: "success" | "failed" }>;
}
