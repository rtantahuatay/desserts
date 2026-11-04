import { MinusIcon, PlusIcon } from "./icons";

type QuantityStepperProps = {
    quantity: number;
    className?: string;
};


const stepButton =  "flex size-5 items-center justify-center rounded-full border border-white text-white transition-colors hover:bg-white hover:text-brand";

export default function QuantityStepper( { quantity, className = "" }: QuantityStepperProps ) {
    return (
        <div className={` flex h-11 items-center justify-between rounded-full bg-brand px-3 ${className}`}>
            <button type="button" aria-label="Decrease quantity" className={stepButton}>
                <MinusIcon className="w-2.5" />
            </button>

            <span className="text-sm font-semibold text-white">{quantity}</span>

            <button type="button" aria-label="Increase quantity" className={stepButton}>
                <PlusIcon className="w-2.5" />
            </button>
        </div>
    )
}