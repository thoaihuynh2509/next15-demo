import Link from "next/link";
import { Plus, Mic, BookOpen, Brain } from "lucide-react";

const Cta = () => {
  return (
    <section className="custom-cta-section">
      <div className="custom-cta-content">
        <div className="custom-badge custom-badge-light">
          <Brain size={16} />
          <span>Start learning your way</span>
        </div>

        <h2 className="custom-cta-title">
          Build and Personalize Your Learning Companion
        </h2>

        <p className="custom-cta-description">
          Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
        </p>

        <div className="custom-cta-visual">
          <div className="custom-floating-icons">
            <div className="custom-icon-circle icon-1">
              <BookOpen size={24} />
            </div>
            <div className="custom-icon-circle icon-2">
              <Mic size={24} />
            </div>
            <div className="custom-icon-circle icon-3">
              <Brain size={24} />
            </div>
          </div>
        </div>

        <Link href="/companions/new">
          <button className="custom-btn custom-btn-primary">
            <Plus size={16} />
            <span>Build a New Companion</span>
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Cta;