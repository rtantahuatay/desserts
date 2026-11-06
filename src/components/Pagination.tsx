type PaginationProps = {
    page: number;
    totalPages: number;
    isLoading: boolean;
    onPageChange: (page: number) => void;
};


export default function Pagination ({page, totalPages, isLoading, onPageChange}: PaginationProps){
    const buttonClass = "rounded-full border border-rose-300 bg-white px-5 py-2 text-sm font-semibold transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-rose-300 disabled:hover:text-rose-900";

    return(
        <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4">

            <button type="button" onClick={()=> onPageChange(page - 1)}
                disabled={page <= 1 || isLoading}
                className={buttonClass}>
            Previous
            </button>

            <p className="text-sm text-rose-500" aria-live="polite">
                Page <span className="font-semibold text-rose-900">{page}</span> of {""} 
                <span className="font-semibold text-rose-900">{totalPages}</span>
            </p>

            <button type="button" onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages || isLoading}
                className={buttonClass}>
                Next
            </button>

        </nav>
    );
}