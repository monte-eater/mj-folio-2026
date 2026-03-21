import Link from "next/link";

export default function AboutBlock() {
  return (
    <div
      style={{
        alignSelf: "stretch",
        paddingTop: 16,
        paddingBottom: 16,
        borderTop: "2px solid #000000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 24,
      }}
    >
      <div
        style={{
          color: "#252525",
          fontSize: 32,
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        About_026
      </div>
      <p
        style={{
          alignSelf: "stretch",
          color: "rgba(37, 37, 37, 0.80)",
          fontSize: 24,
          fontWeight: 600,
          lineHeight: 1.4,
        }}
      >
        Beyond pixels and prototypes, I&apos;m a UX/UI Designer driven by a
        passion for solving complex problems with creative, user-centred
        solutions, that drive results.
      </p>
      <Link
        href="/about"
        style={{
          paddingTop: 16,
          paddingBottom: 16,
          display: "inline-flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 24,
          textDecoration: "none",
          color: "var(--teal)",
        }}
        className="more-link"
      >
        <span
          style={{
            fontSize: "clamp(14px, 1.4vw, 20px)",
            fontWeight: 600,
          }}
          className="more-link-text"
        >
          More about me
        </span>
        <span className="more-link-arrow">
          <svg
            width="34"
            height="22"
            viewBox="0 0 34 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 11H33M23 1L33 11L23 21"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}
