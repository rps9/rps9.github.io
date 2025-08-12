import { useRef, useState } from 'react';
import X01Player from '../components/X01Player';
import X01ScoreKeeper from '../components/X01ScoreKeeper';
import Header from '../components/Header';

type Player = { id: number; name: string; score: number; doubledIn: boolean };

export default function X01() {
    const [startScore, setStartScore] = useState<number>(301);
    const [players, setPlayers] = useState<Player[]>([]);
    const [removeMode, setRemoveMode] = useState(false);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [throwsThisTurn, setThrowsThisTurn] = useState(0);
    const [gameOver, setGameOver] = useState<{ winnerId: number } | null>(null);
    const nextId = useRef(1);

    const canAdd = players.length < 4 && !gameOver;

    const addPlayer = () => {
        if (!canAdd) return;
        const id = nextId.current++;
        setPlayers(prev => {
        const next = [...prev, { id, name: `Player ${prev.length + 1}`, score: startScore, doubledIn: false }];
        if (activeId === null) setActiveId(id);
        return next;
        });
    };

    const activePlayer = activeId !== null ? players.find(p => p.id === activeId) : undefined;


    const updatePlayerName = (id: number, name: string) => {
        setPlayers(prev => prev.map(p => (p.id === id ? { ...p, name } : p)));
    };

    const removePlayer = (id: number) => {
        if (!removeMode || gameOver) return;
        setPlayers(prev => {
        const next = prev.filter(p => p.id !== id);
        if (activeId === id) {
            setActiveId(next.length ? next[0].id : null);
            setThrowsThisTurn(0);
        }
        return next;
        });
    };

    const advanceToNextPlayer = () => {
        if (!players.length || activeId === null) return;
        const idx = players.findIndex(p => p.id === activeId);
        const nextIdx = (idx + 1) % players.length;
        setActiveId(players[nextIdx].id);
        setThrowsThisTurn(0);
    };

    const applyScore = (points: number, detail: { isDouble: boolean }) => {
        if (gameOver || activeId === null || !players.length) return;

        let valid = false;
        let winnerId: number | null = null;

        setPlayers(prev => prev.map(p => {
        if (p.id !== activeId) return p;

        // If not doubled in yet, only a double can start scoring
        if (!p.doubledIn) {
            if (!detail.isDouble) return p; // invalid – must double in
            const nextScore = p.score - points;
            if (nextScore < 0) return p;     // bust below zero
            // double-in dart is valid
            valid = true;
            const doubledIn = true;

            if (nextScore === 0) {
            winnerId = p.id;
            }
            return { ...p, score: nextScore, doubledIn };
        }

        // Already doubled in
        const nextScore = p.score - points;
        if (nextScore < 0) return p; 
        if (nextScore === 0 && !detail.isDouble) return p;
        valid = true;
        if (nextScore === 0) winnerId = p.id;
        return { ...p, score: nextScore };
        }));

        if (winnerId) {
        setGameOver({ winnerId });
        return;
        }

        if (valid) {
        setThrowsThisTurn(t => {
            const nt = t + 1;
            if (nt >= 3) {
            advanceToNextPlayer();
            return 0;
            }
            return nt;
        });
        }
    };

    return (
        <>
        <Header />
        <section className="min-h-screen px-4 py-8 bg-gradient-to-b from-gray-900 to-gray-800">
        
        <div className="w-full max-w-6xl mx-auto">
            {/* Top controls */}
            <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-white">X01</h1>

                <div className="w-full max-w-xs">
                <label htmlFor="x01-start" className="block text-sm font-medium text-gray-400 mb-2">
                    Starting score
                </label>
                <input
                    id="x01-start"
                    type="number"
                    inputMode="numeric"
                    placeholder="501"
                    value={startScore}
                    onChange={(e) => setStartScore(Number(e.target.value || 0))}
                    className="w-full bg-gray-900/70 text-white border border-gray-700 rounded-lg px-4 py-3 shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!!players.length || !!gameOver}
                />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                onClick={addPlayer}
                disabled={!canAdd}
                className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-blue-500 text-white
                            hover:bg-blue-600 transition-colors shadow-sm border border-blue-400/20
                            disabled:opacity-50 disabled:cursor-not-allowed"
                aria-disabled={!canAdd}
                >
                Add player {players.length > 0 ? `(${players.length}/4)` : ''}
                </button>

                <button
                onClick={() => setRemoveMode(m => !m)}
                disabled={!!gameOver || players.length === 0}
                className={`inline-flex items-center justify-center h-11 px-5 rounded-lg shadow-sm border
                    ${removeMode
                    ? 'bg-red-500/60 text-white border-red-400/30 hover:bg-red-500/70'
                    : 'bg-red-600 text-white border-red-500 hover:bg-red-500'}
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-pressed={removeMode}
                title={removeMode ? 'Click a player to remove (active)' : 'Toggle remove mode'}
                >
                Remove Player
                </button>
            </div>
            </div>

            {/* Turn HUD */}
            <div className="mt-4 text-sm text-gray-300">
            {gameOver && activeId !== null ? (
                <span className="text-green-400 font-semibold">
                Game over — Winner: {players.find(p => p.id === gameOver.winnerId)?.name}
                </span>
            ) : activeId !== null ? (
                <>
                Turn: <span className="text-white font-semibold">{players.find(p => p.id === activeId)?.name}</span>
                <span className="ml-3 text-gray-400">Dart {throwsThisTurn + 1} of 3</span>
                </>
            ) : (
                <span className="text-gray-500">Add a player to begin</span>
            )}
            </div>

            {/* Score keeper */}
            <div className="mt-6">
                <X01ScoreKeeper
                onScore={(points, detail) => applyScore(points, { isDouble: detail.isDouble })}
                disabled={removeMode || !players.length || activeId === null || !!gameOver}
                currentScore={activePlayer ? activePlayer.score : 0}     // <-- NEW
                doubledIn={activePlayer ? activePlayer.doubledIn : false} // <-- NEW
                />
            </div>

            {/* Players stacked vertically */}
            <div className="mt-8 flex flex-col gap-4">
            {players.map((p, idx) => (
                <X01Player
                key={p.id}
                id={p.id}
                name={p.name}
                score={p.score}
                indexLabel={`Player ${idx + 1}`}
                onNameChange={(next) => updatePlayerName(p.id, next)}
                onRemove={() => removePlayer(p.id)}
                removeMode={removeMode}
                isActive={p.id === activeId}
                onActivate={() => setActiveId(p.id)}
                />
            ))}
            </div>
        </div>
        </section>
        </>
    );
}
