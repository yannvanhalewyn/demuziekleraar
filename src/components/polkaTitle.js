export default function PolkaTitle({ className, dotsClassName, children }) {
  return (
    <div className={`relative ${className}`}>
      <div className={`absolute mt-4 bg-polka-dots ${dotsClassName} bg-polka-dots--title bg-repeat`}></div>
      <div className="relative">{children}</div>
    </div>
  );
}
