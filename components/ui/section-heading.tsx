import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  className?: string;
};

export default function SectionHeading({ title, className }: SectionHeadingProps) {
  return <h2 className={cn("text-3xl md:text-4xl font-bold text-[#065b4b]", className)}>{title}</h2>;
}
