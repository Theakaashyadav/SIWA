import { Inbox } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-sky-50 text-[#176b9c]">
        <Inbox aria-hidden="true" className="size-6" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-[#123b5d]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
