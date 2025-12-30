import { useState } from 'react';
import { EstimateRequestItem } from '../types/driverEstimate';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'confirm' | 'reject' | null>(null);
  const [selected, setSelected] = useState<EstimateRequestItem | null>(null);

  const openConfirm = (request: EstimateRequestItem) => {
    setSelected(request);
    setType('confirm');
    setIsOpen(true);
  };

  const openReject = (request: EstimateRequestItem) => {
    setSelected(request);
    setType('reject');
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setType(null);
    setSelected(null);
  };

  return {
    isOpen,
    type,
    selected,
    openConfirm,
    openReject,
    close,
  };
};
