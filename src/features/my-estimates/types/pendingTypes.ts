export interface PendingEstimatesSubHeaderProps {
  movingType: string;
  movingDate: string;
  applyAt: string;
  fromAddress: string;
  toAddress: string;
}

export interface PendingEstimatesTabProps {
  activeTab: 'pending' | 'received';
}
