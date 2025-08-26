import { getAllCompanions, getRecentSessions, getUserCompanions, getUserSessions } from "@/features/companion/actions/companion";
import CompanionCard from "@/features/companion/components/CompanionCard";
import CompanionList from "@/features/companion/components/CompanionList";
import CTA from "@/features/companion/components/CTA";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      <h1 className="text-2xl font-bold underline">Popular Companions 🎉</h1>

      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}

      </section>

      <section className="home-section">
        <CompanionList title="Recent Sessions" companions={recentSessionsCompanions} />
        <CTA />
      </section>

    </main>
  );
}
