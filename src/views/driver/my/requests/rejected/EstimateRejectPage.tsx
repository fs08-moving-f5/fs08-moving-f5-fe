'use client';

import EstimateListPage from '../EstimateListPage';
import { getRejectEstimates } from '@/features/driver-estimate/services/driverEstimate.service';

const EstimateConfirmsPage = () => (
  <EstimateListPage
    queryKey={['estimate-confirms']}
    queryFn={getRejectEstimates}
    emptyType="reject"
  />
);

export default EstimateConfirmsPage;
