'use client';

import EstimateListPage from '../EstimateListPage';
import { getRejectEstimates } from '@/features/driver-estimate/services/driverEstimate.service';

const EstimateConfirmsPage = () => (
  <EstimateListPage
    queryKey={['estimate-rejects']}
    queryFn={getRejectEstimates}
    emptyType="reject"
  />
);

export default EstimateConfirmsPage;
