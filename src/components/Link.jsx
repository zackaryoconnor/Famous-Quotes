import { Link } from "react-router-dom";

export default function LinkComponent({text, link, className}) {
  return (
      <Link className={`${className}  hidden navBreakPoint:!block hover:underline hover:decoration-2 hover:underline-offset-8`} to={link}>
        {text}
      </Link>
  );
}