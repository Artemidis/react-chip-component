import Chips, {type IChip} from "./components/Chips.tsx";
import Chip from "./components/Chip.tsx";

const chips: IChip[] = [
    { id: 1, label: 'JS' },
    { id: 2, label: 'Python' },
    { id: 3, label: 'TypeScript' },
    { id: 4, label: 'Web Development' },
    { id: 5, label: 'Frontend' },
    { id: 6, label: 'Backend' },
    { id: 7, label: 'Full Stack Engineering' },
    { id: 8, label: 'UI/UX Design' },
    { id: 9, label: 'Responsive Layouts' },
    { id: 10, label: 'Cross-Browser Compatibility' },
    { id: 11, label: 'State Management' },
    { id: 12, label: 'Component Architecture' },
    { id: 13, label: 'Performance Optimization' },
    { id: 14, label: 'Accessibility (a11y)' },
    { id: 15, label: 'Internationalization (i18n)' },
    { id: 16, label: 'Continuous Integration' },
    { id: 17, label: 'Test-Driven Development' },
    { id: 18, label: 'Cloud Infrastructure' },
    { id: 19, label: 'Machine Learning Integration' },
    { id: 20, label: 'Progressive Web Applications' }
]

function shuffle<T>(array: T[]): T[] {
    const clonedArray = [...array];
    let currentIndex = clonedArray.length;
    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [clonedArray[currentIndex], clonedArray[randomIndex]] = [clonedArray[randomIndex], clonedArray[currentIndex]];
    }
    return clonedArray;
}

function App() {
    const shuffledChips = shuffle(chips);
    return (
        <div className={"container mx-auto h-100 pt-6 px-4"}>
            <Chips items={shuffledChips} />
            <Chip
                value={"Отдельный чипс"}
                onClick={() => console.log('Clicked')}
            />
            <Chip
                value="Отдельный активный чипс"
                isSelected={true}
            />
        </div>
    )
}

export default App
