type ConfirmDeleteModalProps = {
    isOpen: boolean;
    productName: string;
    isDeleting: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ConfirmDeleteModal({
    isOpen,
    productName,
    isDeleting,
    onCancel,
    onConfirm,
}: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/50 md:items-center md:p-6">
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-product-title"
                aria-describedby="delete-product-description"
                className="w-full rounded-t-xl bg-white p-6 md:max-w-md md:rounded-xl md:p-8"
            >
                <h2 id="delete-product-title" className="text-2xl font-bold">
                    Delete product?
                </h2>
                <p id="delete-product-description" className="mt-2 text-rose-500">
                    "{productName}" will be removed from the store and from your cart. This cannot be undone.
                </p>

                <div className="mt-6 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
                    <button
                        type="button"
                        autoFocus
                        disabled={isDeleting}
                        onClick={onCancel}
                        className="rounded-full border border-rose-400 px-6 py-3 font-semibold transition-colors
                            hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isDeleting}
                        onClick={onConfirm}
                        className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition-colors
                            hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}