import { getCompanion } from "@/features/companion/actions/companion";
import CompanionDetail from "@/features/companion/components/CompanionDetail";

export default async function CompanionDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const companionData = await getCompanion(id);

  return (
    <div>
      <h1>CompanionDetail</h1>

      <CompanionDetail data={companionData} />
    </div>
  );
}