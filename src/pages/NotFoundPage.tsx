import { Link } from "react-router";
import NotFoundMessage from "../components/NotFoundMessage";

export default function NotFoundPage() {
    return (
        <main className="mx-auto max-w-4xl p-6 lg:p-10">
            <Link to="/" className="font-semibold text-brand hover:underline">
                ← Back to products
            </Link>

            <NotFoundMessage message="This page does not exist." />
        </main>
    );
}