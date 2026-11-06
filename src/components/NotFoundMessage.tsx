type NotFoundMessageProps = {
    message: string;
};

export default function NotFoundMessage ({message}: NotFoundMessageProps ) {
    return (
        <div className="mt-8 rounded-xl bg-white p-6 text-center">
            <p className="text-[40px] leading-tight font-bold text-brand">404</p>
            <p className="mt-2 text-rose-500">{message}</p>
        </div>
    );
}