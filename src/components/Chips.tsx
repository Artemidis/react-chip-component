import {useRef, type FC, useState, useLayoutEffect, useCallback, useEffect} from "react";
import {Popover} from "@mui/material";
import { isArraysEqual } from "../utils/arrayUtils.ts";
import Chip from "./Chip.tsx";

export interface IChip {
    id: number,
    label: string,
}

interface IProps {
    items: IChip[],
}

const Chips: FC<IProps> = ({items}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [visibleChips, setVisibleChips] = useState<IChip[]>([])
    const [hiddenChips, setHiddenChips] = useState<IChip[]>([])
    const [selectedChipId, setSelectedChipId] = useState<number | null>(null)

    const showChipsButtonRef = useRef<HTMLButtonElement>(null)
    const containerRef = useRef<HTMLDivElement>(null);
    const chipRefs = useRef<Map<number, HTMLDivElement | null>>(new Map())

    const calculateChipsVisibility = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const containerWidth = container.offsetWidth || 0;
        let visibleChipsWidth = showChipsButtonRef?.current?.offsetWidth || 0;

        const visibleCalcChips: IChip[] = [];
        const hiddenCalcChips: IChip[] = [];

        items.forEach(item => {
            const chipEl = chipRefs.current.get(item.id)
            if (!chipEl) return;

            const chipElMarginRight = parseInt(window.getComputedStyle(chipEl).marginRight);
            const chipWidth = chipEl.offsetWidth + chipElMarginRight || 0;
            if (chipEl && visibleChipsWidth + chipWidth < containerWidth) {
                visibleCalcChips.push(item)
                visibleChipsWidth += chipWidth;
            } else {
                hiddenCalcChips.push(item)
            }
        })
        setVisibleChips(prev => isArraysEqual(prev, visibleCalcChips) ? prev : visibleCalcChips)
        setHiddenChips(prev => isArraysEqual(prev, hiddenCalcChips) ? prev : hiddenCalcChips)
    }, [items])

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(calculateChipsVisibility);
        resizeObserver.observe(container)

        return () => resizeObserver.disconnect()
    }, [calculateChipsVisibility])

    useLayoutEffect(() => {
        calculateChipsVisibility()
    }, [calculateChipsVisibility]);

    const setChipRef = (id: number) => (el: HTMLDivElement | null) => {
        chipRefs.current.set(id, el);
    };

    return (
        <div ref={containerRef}>
            <div className={"flex f-row absolute invisible"}>
                {items.map(item => (
                    <Chip
                        key={item.id}
                        value={item.label}
                        ref={setChipRef(item.id)}
                    />
                ))}
            </div>
            <div className={"flex f-row mb-10 overflow-x-hidden"}>
                {visibleChips.map(item => (
                    <Chip
                        key={item.id}
                        value={item.label}
                        onClick={() => setSelectedChipId(item.id)}
                        isSelected={item.id === selectedChipId}
                    />
                ))}
                {hiddenChips.length > 0 && <button
                    ref={showChipsButtonRef}
                    onClick={() => setIsPopupOpen(true)}
                    className={"bg-gray-200 hover:bg-gray-300 rounded-full flex text-nowrap text-sm px-[12px] py-[8px] mb-[4px] cursor-pointer"}
                >
                    <span className={"w-[20px]"}><img src={"/three-dots.svg"} alt={"three-dots"} width={20}/></span>
                </button>}
            </div>
            <Popover
                open={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                anchorEl={showChipsButtonRef.current}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                slotProps={{
                    paper: {
                        sx: {
                            maxWidth: "min(90vw, 400px)",
                            padding: "1rem",
                            marginTop: "0.5rem"
                        }
                    }
                }}
            >
                <div className={"flex f-row flex-wrap"}>
                    {hiddenChips.map(item => (
                        <Chip
                            key={item.id}
                            value={item.label}
                            onClick={() => setSelectedChipId(item.id)}
                            isSelected={item.id === selectedChipId}
                        />
                    ))}
                </div>
            </Popover>
        </div>
    )
}

export default Chips;
