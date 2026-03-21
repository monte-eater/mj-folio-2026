export default function Copyright() {
  const year = new Date().getFullYear();
  return (
    <div className="copyright">
      &copy; {year} Montague Joachim. All rights reserved.
    </div>
  );
}
