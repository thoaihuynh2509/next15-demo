import CompanionCard from "@/features/companion/components/CompanionCard";
import CompanionList from "@/features/companion/components/CompanionList";
import CTA from "@/features/companion/components/CTA";

export default function DashboardPage() {

  return (
    <main>
      <h1 className="text-2xl font-bold underline">Popular Companions 🎉</h1>

      <section className="home-section">
        <CompanionCard id="1" name="Neura the Brainy Explorer" topic="Neural Network of the Brain" subject="science" duration={45} color="#E5D0FF" bookmarked />
        <CompanionCard id="2" name="Countsy the Number Wizard" topic="Derivatives & Integrals" subject="maths" duration={30} color="#FFDA6E" bookmarked />
        <CompanionCard id="3" name="Verba the Vocabulary Builder" topic="English Literature" subject="language" duration={30} color="#BDE7FF" bookmarked />
      </section>

      <section className="home-section">
        <CompanionList title="Recent Sessions" companions={[{
          id: "1",
          subject: "science",
          name: "Neura the Brainy Explorer",
          topic: "Neural Network of the Brain",
          duration: 45,
          color: "#E5D0FF",
        }]} />
        <CTA />
      </section>

    </main>
  );
}
