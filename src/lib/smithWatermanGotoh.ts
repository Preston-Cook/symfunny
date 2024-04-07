export default class SmithWatermanGotoh {
  constructor(
    private gapPenalty: number,
    private matchScore: number,
    private mismatchPenalty: number,
  ) {}

  align(sequence1: string, sequence2: string): number {
    const matrix: number[][] = [];
    let maxScore = 0;

    for (let i = 0; i <= sequence1.length; i++) {
      matrix[i] = [];
      for (let j = 0; j <= sequence2.length; j++) {
        if (i === 0 || j === 0) {
          matrix[i][j] = 0;
        } else {
          const match =
            matrix[i - 1][j - 1] +
            (sequence1[i - 1] === sequence2[j - 1]
              ? this.matchScore
              : this.mismatchPenalty);
          const deleteGap = matrix[i - 1][j] + this.gapPenalty;
          const insertGap = matrix[i][j - 1] + this.gapPenalty;
          matrix[i][j] = Math.max(0, match, deleteGap, insertGap);
          maxScore = Math.max(maxScore, matrix[i][j]);
        }
      }
    }
    return maxScore;
  }
}
