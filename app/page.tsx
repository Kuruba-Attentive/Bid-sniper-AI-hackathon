import { DashboardLayout } from '@/components/dashboard-layout';
import { BidWorkflow } from '@/components/bid-workflow';

export default function Home() {
  return (
    <DashboardLayout>
      <BidWorkflow />
    </DashboardLayout>
  );
}