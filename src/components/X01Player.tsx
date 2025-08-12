interface X01PlayerProps {
    id: number;
    name: string;
    onNameChange: (next: string) => void;
    score: number | '';
    className?: string;
    indexLabel?: string;
    removeMode?: boolean;
    onRemove?: () => void;
    isActive?: boolean;
    onActivate?: () => void; 
}

export default function X01Player({
    id, name, onNameChange, score, className = '', indexLabel,
    removeMode = false, onRemove, isActive = false, onActivate,
}: X01PlayerProps) {
    const inputId = `x01-player-name-${id}`;

    const clickableRemove = removeMode && !!onRemove;
    const clickableActivate = !removeMode && !!onActivate;

    return (
        <div
        onClick={clickableRemove ? onRemove : clickableActivate ? onActivate : undefined}
        className={[
            "min-w-0 w-full bg-gray-900/70 border border-gray-700 rounded-xl p-4",
            "text-gray-200 shadow-sm flex flex-col",
            clickableRemove ? "cursor-pointer hover:bg-gray-800/70 ring-1 ring-red-500/60" : "",
            !clickableRemove && isActive ? "ring-1 ring-green-500/60" : "",   // <-- green turn highlight
            className,
        ].join(" ")}
        role={clickableRemove ? "button" : undefined}
        aria-label={clickableRemove ? `Remove ${name}` : undefined}
        tabIndex={clickableRemove ? 0 : -1}
        onKeyDown={(e) => {
            if (clickableRemove && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onRemove?.();
            }
            // Prevent activating/removing when typing in the input
            // (Input itself stops propagation for space/enter below)
        }}
        >
        {/* Top row: Name (editable) + Score */}
        <div className="flex items-center gap-3">
            <input
            id={inputId}
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={indexLabel}
            autoComplete="off"
            className="flex-1 min-w-0 text-sm leading-5 bg-gray-900/70 text-white
                        border border-gray-700 rounded-lg px-2 py-2
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder:text-gray-500"
            // prevent remove/activate when interacting with the input
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') e.stopPropagation();
            }}
            />

            <div className="shrink-0">
            <span className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/70 px-3 py-2">
                <span className="text-xs text-gray-400">Score</span>
                <span className="text-sm text-white font-semibold">{score === '' ? '—' : score}</span>
            </span>
            </div>
        </div>
        </div>
    );
}
