import Phaser from "phaser";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  create(): void {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height * 0.28, "板前修行", {
        fontSize: "40px",
        color: "#f5e6c8",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.35, "一流の“的”を得る旅", {
        fontSize: "18px",
        color: "#c9a86a",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.5, "🧑‍🍳", { fontSize: "72px" })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.62, "パプリカ先輩「さあ、修行を始めようか」", {
        fontSize: "15px",
        color: "#ffffff",
        wordWrap: { width: width * 0.8 },
        align: "center",
      })
      .setOrigin(0.5);

    const startButton = this.add
      .rectangle(width / 2, height * 0.78, width * 0.6, 56, 0x8b1e1e)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(width / 2, height * 0.78, "修行を始める", {
        fontSize: "20px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    startButton.on("pointerdown", () => {
      this.scene.start("StoryScene");
    });
  }
}
