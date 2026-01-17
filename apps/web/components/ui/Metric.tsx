import React from "react";

export function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="cq-metric flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-lg font-semibold text-slate-50">{value}</span>
      {hint && (
        <span className="text-[11px] text-slate-500">
          {hint}
        </span>
      )}
    </div>
  );
}
