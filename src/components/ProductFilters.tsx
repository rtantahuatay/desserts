import { useCategories } from "../hooks/useCategoriesQueries";

type ProductFiltersProps = {
    search: string;
    category: string;
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
};

export default function ProductFilters ({
    search ,
    category ,
    onSearchChange ,
    onCategoryChange ,
}: ProductFiltersProps) {

    const { data: categories = [], isPending, isError } = useCategories();

    return (
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <label className="flex-1 text-sm font-semibold">
                Search by name
                <input type="search" value={search} onChange={(event) => onSearchChange(event.target.value)} 
                placeholder="Example: vanilla" className="mt-1 w-full rounded-lg border border-rose-300 bg-white p-3 font-normal"/>
            </label>

            <label className="text-sm font-semibold md:w-56">
                Category
                <select value={category} disabled={isPending || isError} onChange={(event) => onCategoryChange(event.target.value)} 
                className="mt-1 w-full rounded-lg border border-rose-300 bg-white p-3 font-normal">
                    <option value="">{isPending ? "Loading categories..." : isError ? "Categories unavailable" : "All categories"}</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}