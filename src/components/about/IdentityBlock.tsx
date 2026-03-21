interface IdentityBlockProps {
  name?: string;
  jobTitle?: string;
}

export default function IdentityBlock({ name, jobTitle }: IdentityBlockProps) {
  const displayName = name ?? "Montague Joachim";
  const [first, ...rest] = displayName.split(" ");
  return (
    <div className="identity-block">
      <div className="identity-name">
        {first}
        <br />
        {rest.join(" ")}
      </div>
      <div className="identity-title">
        {jobTitle ?? "UX/UI Designer · Experimentation & Personalisation"}
        <br />
        Melbourne, Australia
      </div>
    </div>
  );
}
