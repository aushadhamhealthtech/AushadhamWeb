import { Star } from "lucide-react";

export default function StarRating({
    rating,
    maxStars = 5,
    size = 14,
}: {
    rating: number;
    maxStars?: number;
    size?: number;
}) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: maxStars }).map((_, i) => {
                const cls =
                    i < fullStars
                        ? "fill-amber-400 text-amber-400"
                        : i === fullStars && hasHalf
                          ? "fill-amber-200 text-amber-400"
                          : "fill-gray-200 text-gray-200";
                return <Star key={i} size={size} className={cls} />;
            })}
        </div>
    );
}
