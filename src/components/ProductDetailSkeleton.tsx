export default function ProductDetailSkeleton() {
    return (
        <div aria-hidden="true" className="mt-8 grid animate-pulse gap-8 md:grid-cols-2 md:items-center">
            <div className="aspect-[654/424] rounded-lg bg-rose-100 md:aspect-[427/424] lg:aspect-[502/480]" />

            <div>
                <div className="h-6 w-1/3 rounded bg-rose-100" />
                <div className="mt-2 h-20 w-full rounded bg-rose-100" />
                <div className="mt-4 h-8 w-1/4 rounded bg-rose-100"/>
            </div>
        </div>
    );
}