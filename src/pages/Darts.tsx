import Header from '../components/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Game = 'cricket' | 'X01';

const GAME_OPTIONS: { value: Game; label: string }[] = [
  { value: 'cricket', label: 'Cricket' },
  { value: 'X01',     label: 'X01' }
];

export default function Darts() {
  const [game, setGame] = useState<Game>('cricket');

  const selected = GAME_OPTIONS.find(o => o.value === game)!;
  const targetPath = game === 'cricket' ? '/darts/cricket' : '/darts/x01';

  return (
    <>
    <Header />
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-3xl w-full mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Darts <span className="text-blue-400">Games</span>
        </h1>
        <p className="text-gray-300 mt-4">Choose a game to get started.</p>

        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-md text-left">
            <label htmlFor="game" className="block text-sm font-medium text-gray-400 mb-2">
              Game format
            </label>

            <div className="relative">
              <select
                id="game"
                value={game}
                onChange={(e) => setGame(e.target.value as Game)}
                className="w-full appearance-none bg-gray-900/70 text-white border border-gray-700 rounded-lg px-4 py-3 pr-10 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {GAME_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* chevron */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-400">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Selected + Play button */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            to={targetPath}
            className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            aria-label={`Play ${selected.label}`}
          >
            Play {selected.label}
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
