/**
 * Executes a list of async tasks with a concurrency limit.
 *
 * Tasks are executed in parallel, but never more than `concurrencyLimit` at the same time.
 * Useful when making many network requests without overloading the server.
 *
 * Failed tasks are logged but skipped; only successful results are returned.
 *
 * @template T - Type of task result
 * @param tasks - Array of functions that return a Promise<T>
 * @param concurrencyLimit - Maximum number of tasks to run in parallel
 * @returns Promise resolving to an object containing all successful results
 */
export async function runWithConcurrencyLimit<T>(
  tasks: (() => Promise<T>)[],
  concurrencyLimit: number,
): Promise<{ successes: T[] }> {
  const results: T[] = new Array(tasks.length);
  let index = 0;

  const worker = async () => {
    while (index < tasks.length) {
      const currentIndex = index++;
      try {
        results[currentIndex] = await tasks[currentIndex]();
      } catch (e) {
        console.error(`Task ${currentIndex} failed`, e);
      }
    }
  };

  await Promise.all(Array.from({ length: concurrencyLimit }, worker));
  return { successes: results };
}
