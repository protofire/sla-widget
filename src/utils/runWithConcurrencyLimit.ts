export interface ConcurrencyResult<T> {
  successes: T[];
}

export async function runWithConcurrencyLimit<T>(
  tasks: (() => Promise<T>)[],
  concurrencyLimit: number,
): Promise<ConcurrencyResult<T>> {
  const successes: T[] = [];
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < tasks.length) {
      const idx = currentIndex++;
      try {
        const result = await tasks[idx]();
        successes[idx] = result;
      } catch (error) {
        console.error(`Task ${idx} failed`, error);
      }
    }
  }

  const workers = Array.from({ length: concurrencyLimit }, () => worker());

  await Promise.all(workers);

  return { successes };
}
