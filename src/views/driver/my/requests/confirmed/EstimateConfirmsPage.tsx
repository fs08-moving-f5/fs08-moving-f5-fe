'use client';

import EstimateListPage from '../EstimateListPage';
import { getConfirmEstimates } from '@/features/driver-estimate/services/driverEstimate.service';

const EstimateConfirmsPage = () => (
  <EstimateListPage
    queryKey={['estimate-confirms']}
    queryFn={getConfirmEstimates}
    emptyType="confirm"
  />
);

export default EstimateConfirmsPage;
