import Phaser from "phaser";
import { gameState } from "../gameState";
import { links, openLink } from "../links";

type Judgment = "的中" | "惜しい" | "外れ";

const SCORE_TABLE: Record<Judgment, number> = {
  的中: 3,
  惜しい: 1,
  外れ: 0,
};

export class ResultScene extends Phaser.Scene {
  constructor() {
    super("ResultScene");
  }

  create(data: { results: Judgment[] }): void {
    const { width, height } = this.scale;
    const results = data.results ?? [];

    const gained = results.reduce((sum, r) => sum + SCORE_TABLE[r], 0);
    gameState.addStat("技術", gained);

    this.add.rectangle(width / 2, height / 2, width, height, 0x1b1b1b);

    this.add
      .text(width / 2, height * 0.12, "修行の結果", {
        fontSize: "26px",
        color: "#f5e6c8",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const hits = results.filter((r) => r === "的中").length;
    this.add
      .text(width / 2, height * 0.2, `的中 ${hits} / ${results.length}`, {
        fontSize: "16px",
        color: "#c9a86a",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.3, `技術 +${gained}`, {
        fontSize: "22px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    let y = height * 0.4;
    (["技術", "知識", "心構え"] as const).forEach((stat) => {
      this.add.text(width * 0.15, y, `${stat}: ${gameState.stats[stat]}`, {
        fontSize: "16px",
        color: "#ffffff",
      });
      y += 32;
    });

    this.addLinkButton(width / 2, height * 0.62, links.minigame.knife);
    this.addLinkButton(width / 2, height * 0.62 + 56, links.category["技術"]);

    this.addActionButton(width / 2, height * 0.82, "もう一度", 0x8b1e1e, () => {
      this.scene.start("KnifeMiniGameScene");
    });

    this.addActionButton(width / 2, height * 0.82 + 60, "タイトルへ", 0x444444, () => {
      this.scene.start("TitleScene");
    });
  }

  private addLinkButton(
    x: number,
    y: number,
    link: { label: string; url: string },
  ): void {
    const width = this.scale.width * 0.78;
    const bg = this.add
      .rectangle(x, y, width, 44, 0x2b2320)
      .setStrokeStyle(1, 0xc9a86a)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(x, y, `📖 ${link.label}`, {
        fontSize: "14px",
        color: "#c9a86a",
      })
      .setOrigin(0.5);

    bg.on("pointerdown", () => openLink(link));
  }

  private addActionButton(
    x: number,
    y: number,
    label: string,
    color: number,
    onClick: () => void,
  ): void {
    const rect = this.add
      .rectangle(x, y, this.scale.width * 0.6, 50, color)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(x, y, label, { fontSize: "18px", color: "#ffffff", fontStyle: "bold" })
      .setOrigin(0.5);

    rect.on("pointerdown", onClick);
  }
}
