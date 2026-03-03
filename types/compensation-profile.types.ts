export interface CompensationProfile {
  _id: string;
  name: string;
  businessId: string;
  currency: string;
  hourlyRate: number;
  overtimeRateMultiplier: number;
  sundayRateMultiplier: number;
  nightDifferentialRateMultiplier: number;
  isTransportationAllowanceEnabled: boolean;
  transportationAllowanceMonthlyAmount: number;
  isSssEnabled: boolean;
  isPagIbigEnabled: boolean;
  isPhilHealthEnabled: boolean;
  sssDeductionFixedAmount: number;
  pagIbigDeductionFixedAmount: number;
  philHealthDeductionFixedAmount: number;
  effectiveFrom: string;
  effectiveTo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompensationProfileRequest {
  name: string;
  businessId: string;
  currency: string;
  hourlyRate: number;
  overtimeRateMultiplier: number;
  sundayRateMultiplier: number;
  nightDifferentialRateMultiplier: number;
  isTransportationAllowanceEnabled: boolean;
  transportationAllowanceMonthlyAmount: number;
  isSssEnabled: boolean;
  isPagIbigEnabled: boolean;
  isPhilHealthEnabled: boolean;
  sssDeductionFixedAmount: number;
  pagIbigDeductionFixedAmount: number;
  philHealthDeductionFixedAmount: number;
  effectiveFrom: string;
  effectiveTo?: string;
  isActive?: boolean;
}

export interface UpdateCompensationProfileRequest extends Partial<CreateCompensationProfileRequest> {}

export interface CompensationProfileListQuery {
  businessId: string;
  isActive?: boolean;
}
