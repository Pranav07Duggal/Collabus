
export const gradientClasses = [
    'bg-gradient-to-r from-pink-400 to-red-500',
    'bg-gradient-to-r from-green-400 to-blue-500',
    'bg-gradient-to-r from-purple-400 to-indigo-500',
    'bg-gradient-to-r from-yellow-400 to-orange-500',
    'bg-gradient-to-r from-teal-400 to-cyan-500',
    'bg-gradient-to-r from-blue-400 to-emerald-500',
    'bg-gradient-to-r from-indigo-400 to-pink-400',
    'bg-gradient-to-r from-rose-400 to-fuchsia-500',
    'bg-gradient-to-r from-amber-400 to-lime-500',
    'bg-gradient-to-r from-sky-400 to-purple-400',
    'bg-gradient-to-r from-orange-400 to-pink-500',
    'bg-gradient-to-r from-violet-500 to-yellow-300',
    'bg-gradient-to-r from-red-400 to-yellow-400',
    'bg-gradient-to-r from-emerald-400 to-lime-400',
    'bg-gradient-to-r from-slate-400 to-slate-600',
    'bg-gradient-to-r from-zinc-400 to-gray-600',
    'bg-gradient-to-r from-cyan-400 to-violet-400',
    'bg-gradient-to-r from-gray-400 to-red-500',
    'bg-gradient-to-r from-lime-300 to-green-500',
    'bg-gradient-to-r from-blue-400 to-indigo-600',
    'bg-gradient-to-r from-fuchsia-400 to-pink-500',
    'bg-gradient-to-r from-yellow-200 to-yellow-500',
    'bg-gradient-to-r from-rose-300 to-rose-500',
    'bg-gradient-to-r from-orange-300 to-amber-500',
    'bg-gradient-to-r from-violet-400 to-indigo-700',
  ];
  
  export function getHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
  
  export function getGradientClass(seed: string): string {
    const hash = getHash(seed);
    return gradientClasses[hash % gradientClasses.length];
  }
  