export default function ProductCardSkeleton() {
    return (
        <div aria-hidden="true" className="animate-pulse">
            <div className="mb-9 aspect-[654/424] rounded-lg bg-rose-100 md:aspect-[427/424] lg:aspect-[502/480]" />
            <div className="h-5 w-1/3 rounded bg-rose-100" />
            <div className="mt-1 h-6 w-3/4 rounded bg-rose-100" />
            <div className="mt-1 h-6 w-1/4 rounded bg-rose-100" />
        </div>
    );
}