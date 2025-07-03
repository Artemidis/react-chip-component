import {forwardRef, type ReactNode} from "react";
import clsx from "clsx";


interface IProps {
    value: string | ReactNode,
    isSelected?: boolean,
    onClick?: () => void,
}

const Chip = forwardRef<HTMLDivElement | null, IProps>(
    ({value, isSelected = false, onClick}, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "rounded-full inline-flex text-nowrap text-sm px-[16px] py-[8px] mb-[4px] mr-[8px]",
                    isSelected ? "bg-gray-400 cursor-default" : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                )}
                onClick={onClick}
            >
                {value}
            </div>
        )
    }
)

export default Chip;


