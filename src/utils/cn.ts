type ClassValue = string | number | null | undefined | false | readonly ClassValue[];

export const cn = (...values: ClassValue[]): string => {
  const out: string[] = [];
  const walk = (v: ClassValue): void => {
    if (!v && v !== 0) return;
    if (typeof v === "string") {
      if (v.length > 0) out.push(v);
      return;
    }
    if (typeof v === "number") {
      out.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      for (const inner of v) walk(inner);
    }
  };
  for (const v of values) walk(v);
  return out.join(" ");
};
