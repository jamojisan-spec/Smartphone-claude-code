export type StatName = "技術" | "知識" | "心構え";

class GameState {
  stats: Record<StatName, number> = {
    技術: 0,
    知識: 0,
    心構え: 0,
  };

  addStat(name: StatName, amount: number): void {
    this.stats[name] += amount;
  }
}

export const gameState = new GameState();
