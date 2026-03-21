export default function SocialLinks() {
  return (
    <div
      style={{
        alignSelf: "stretch",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="social-links-row"
    >
      <a
        href="mailto:montague.joachim@gmail.com"
        className="soc-link"
      >
        <span>Email</span>
        <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
          <rect x="1" y="1" width="26" height="22" rx="4" fill="currentColor" />
          <path
            d="M5 7.5l9 6 9-6"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <a
        href="https://www.linkedin.com/in/montaguejoachim"
        className="soc-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>LinkedIn</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M741.54,0H58.46C24.62,0,0,24.62,0,58.46v683.08c0,30.77,27.69,58.46,58.46,58.46h683.08c33.85,0,58.46-24.62,58.46-58.46V58.46c0-33.85-27.69-58.46-58.46-58.46ZM246.15,676.92h-123.08v-369.23h123.08v369.23ZM184.62,258.46c-40,0-73.85-33.85-73.85-73.85s33.85-73.85,73.85-73.85,73.85,33.85,73.85,73.85-33.85,73.85-73.85,73.85ZM676.92,676.92h-123.08v-184.62c0-49.23-12.31-98.46-61.54-98.46s-61.54,49.23-61.54,98.46v184.62h-123.08v-369.23h123.08v43.08h6.15c15.38-30.77,55.38-55.38,101.54-55.38,113.85,0,138.46,73.85,138.46,166.15v215.38Z"
          />
        </svg>
      </a>

      <a
        href="https://www.youtube.com/playlist?list=PL0u8HEXV82TdWMHRd_TT-G0SbW5VVcyRh"
        className="soc-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Youtube</span>
        <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
          <rect x="1" y="1" width="26" height="22" rx="4" fill="currentColor" />
          <path d="M11 8.5l7 3.5-7 3.5V8.5Z" fill="white" />
        </svg>
      </a>
    </div>
  );
}
