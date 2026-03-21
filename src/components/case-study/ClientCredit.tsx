interface ClientCreditProps {
  client: string;
  via: string;
}

export default function ClientCredit({ client, via }: ClientCreditProps) {
  return (
    <div className="client-credit">
      <div className="client-credit-label">Client</div>
      <div className="client-credit-value">{client}</div>
      <div className="client-credit-divider" />
      <div className="client-credit-label">Via</div>
      <div className="client-credit-value">{via}</div>
    </div>
  );
}
