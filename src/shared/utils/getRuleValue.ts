export const getRuleValue = (rule: unknown): number | undefined => {
  if (typeof rule === "number") return rule;
  if (rule && typeof rule === "object" && "value" in rule) {
    return rule.value as number;
  }
  return undefined;
};