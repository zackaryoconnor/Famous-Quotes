
export default function LinkComponent({text, className}) {
  return (
      <p className={`${className} hover:underline hover:decoration-2 hover:underline-offset-8`}>
        {text}
      </p>
  );
}