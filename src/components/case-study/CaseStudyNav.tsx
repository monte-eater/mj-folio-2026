import Link from "next/link";

export default function CaseStudyNav() {
  return (
    <div className="cs-nav-bar">
      <Link href="/" className="nav-link back">
        <span className="nav-link-arrow">
          <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
            <path
              d="M27 8H1M1 8L8 1M1 8L8 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="nav-link-text">Back to Home</span>
      </Link>
    </div>
  );
}
