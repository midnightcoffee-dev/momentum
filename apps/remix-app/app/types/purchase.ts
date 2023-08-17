// purchase.ts
export interface Purchase {
  id: string;
  userId: string;
  courseId: string;
  createdAt: Date;
  pricePaid: number;
  status: PurchaseStatus;
}

export enum PurchaseStatus {
  PENDING = "PENDING",
  SUCCESSFUL = "SUCCESSFUL",
  FAILED = "FAILED",
}
