type CategoryBadgeProps = {
    name: string;
};

export default function CategoryBadge ({name }: CategoryBadgeProps) {
    return (
        <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs
                font-semibold text-rose-500">
            {name}
        </span>
    );
}