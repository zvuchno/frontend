import type { DefinitionProps } from "./Definition.types";

export function Definition({
  term,
  description,
  termClassName,
  descriptionClassName,
}: DefinitionProps) {
  return (
    <>
      <dt className={termClassName}>{term}</dt>
      <dd className={descriptionClassName}>{description}</dd>
    </>
  );
}
