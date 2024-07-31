/**
 * Returns the top N prosody scores from a given record of scores.
 *
 * @param scores - The record of scores.
 * @param n - The number of top scores to return. Defaults to 3.
 * @returns An array of objects containing the name and score of the top N prosody scores.
 */
export function getTopNProsody(scores: Record<string, number>, n = 3) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, value]) => ({ name: key, score: value }))
    .map((entry) => {
      return { ...entry, score: Number(entry.score).toFixed(3) };
    });
}
