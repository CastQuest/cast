import React from "react";

export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cq-card rounded-xl border border-slate-800 bg-slate-950/60 p-4 }
    >
      {title && (
        <h2 className="mb-2 text-sm font-semibold tracking-tight text-slate-100">
          {title}
        </h2>
      )}
      <div className="text-xs text-slate-300">{children}</div>
    </section>
  );
}
