import PendingEstimateDetailHeader from '@/features/my-estimates/ui/detailHeader';

const PendingEstimateDetailPageClient = ({ estimateId }: { estimateId: string }) => {
  return (
    <div>
      <PendingEstimateDetailHeader
        driverImageUrl={
          'https://i.namu.wiki/i/aCovXTXUS6V376DByb20LmZ2cX2pLt0VyPzwb-Cyrw8Hd6L_EN2eYevGQjl0y4GlsKMUE6gFJ_J5eDS4TXyeuNYH-7fBmXSeF0Jtvl-91DPYWieVtFdP4fLJB1LIhIBcjIm0ijKYuvtXAGCr19znOg.webp'
        }
      />

      {estimateId}
    </div>
  );
};

export default PendingEstimateDetailPageClient;
