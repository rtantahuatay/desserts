import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues } from "react-hook-form";
import { useCategories } from "../hooks/useCategoriesQueries";
import { PRODUCT_PHOTOS, productSchema, type ProductFormValues } from "../schemas/productSchema";

type ProductFormProps  = {
    defaultValues?: DefaultValues<ProductFormValues>;
    submitLabel: string;
    isSubmitting: boolean;
    onSubmit: (values: ProductFormValues) => void;
}

const EMPTY_VALUES: DefaultValues<ProductFormValues> ={
    name: "",
    category: "",
    photo: "",
};

const FIELD_STYLES = "mt-1 w=full rounded-lg border border-rose-300 bg-white p-3 font-normal";
const ERROR_STYLES = "mt-1 block text-sm font-normal text-brand";

export default function ProductForm ({
    defaultValues  = EMPTY_VALUES,
    submitLabel,
    isSubmitting,
    onSubmit,
}: ProductFormProps) {
    const {data: categories = [], isPending, isError, refetch } = useCategories();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues,
    });

    if (isPending) {
        return <p role="status" className="mt-8 text-rose-500">Loading form...</p>;
    }

    if (isError) {
        return (
            <div role="alert" className="mt-8 rounded-xl bg-white p-6 text-center">
                <p className="font-semibold">Could not load the categories.</p>
                <button type="button" onClick={()=> refetch()} className="mt-4 rounded-full bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark">
                    Try again
                </button>
            </div>
        );
    }

    return (
<form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5 rounded-xl bg-white p-6">
            <label className="text-sm font-semibold">
                Name
                <input type="text" aria-invalid={Boolean(errors.name)} {...register("name")} className={FIELD_STYLES} />
                {errors.name && <span role="alert" className={ERROR_STYLES}>{errors.name.message}</span>}
            </label>

            <label className="text-sm font-semibold">
                Category
                <select aria-invalid={Boolean(errors.category)} {...register("category")} className={FIELD_STYLES}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category && <span role="alert" className={ERROR_STYLES}>{errors.category.message}</span>}
            </label>

            <label className="text-sm font-semibold">
                Price
                <input type="number" step="0.01" min="0" aria-invalid={Boolean(errors.price)}
                    {...register("price", { valueAsNumber: true })} className={FIELD_STYLES} />
                {errors.price && <span role="alert" className={ERROR_STYLES}>{errors.price.message}</span>}
            </label>

            <label className="text-sm font-semibold">
                Photo
                <select aria-invalid={Boolean(errors.photo)} {...register("photo")} className={FIELD_STYLES}>
                    <option value="">Select a photo</option>
                    {PRODUCT_PHOTOS.map((photo) => (
                        <option key={photo.value} value={photo.value}>
                            {photo.label}
                        </option>
                    ))}
                </select>
                {errors.photo && <span role="alert" className={ERROR_STYLES}>{errors.photo.message}</span>}
            </label>

            <button type="submit" disabled={isSubmitting} className="rounded-full bg-brand px-6 py-3 font-semibold text-white
                    transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50">
                {isSubmitting ? "Saving..." : submitLabel}
            </button>
        </form>
    );
}

