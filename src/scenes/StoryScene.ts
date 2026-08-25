import Phaser from "phaser";

interface Line {
  speaker: string;
  text: string;
}

const LINES: Line[] = [
  { speaker: "パプリカ先輩", text: "いらっしゃい。今日からお前もこの店の見習いだ。" },
  { speaker: "見習い", text: "よろしくお願いします！何から覚えればいいですか？" },
  {
    speaker: "パプリカ先輩",
    text: "料理の味は、遠くの的に矢を放つ弓道と同じだ。技術と知識で矢を磨き、お客様という的へ届ける。",
  },
  { speaker: "パプリカ先輩", text: "まずは基本の包丁さばきからだ。的を外さず、まっすぐに。" },
  { speaker: "見習い", text: "はい、やってみます！" },
];

export class StoryScene extends Phaser.Scene {
  private lineIndex = 0;
  private bodyText!: Phaser.GameObjects.Text;
  private speakerText!: Phaser.GameObjects.Text;

  constructor() {
    super("StoryScene");
  }

  create(): void {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x2b2320);

    this.add
      .text(width / 2, height * 0.35, "🧑‍🍳", { fontSize: "96px" })
      .setOrigin(0.5);

    const boxY = height * 0.72;
    this.add.rectangle(width / 2, boxY, width * 0.92, height * 0.32, 0x111111, 0.85);

    this.speakerText = this.add.text(width * 0.09, boxY - height * 0.13, "", {
      fontSize: "16px",
      color: "#c9a86a",
      fontStyle: "bold",
    });

    this.bodyText = this.add.text(width * 0.09, boxY - height * 0.08, "", {
      fontSize: "16px",
      color: "#ffffff",
      wordWrap: { width: width * 0.82 },
      lineSpacing: 6,
    });

    this.add
      .text(width * 0.85, boxY + height * 0.12, "▶タップで次へ", {
        fontSize: "12px",
        color: "#888888",
      })
      .setOrigin(0.5);

    this.input.on("pointerdown", () => this.advance());

    this.showLine();
  }

  private showLine(): void {
    const line = LINES[this.lineIndex];
    this.speakerText.setText(line.speaker);
    this.bodyText.setText(line.text);
  }

  private advance(): void {
    this.lineIndex += 1;
    if (this.lineIndex >= LINES.length) {
      this.scene.start("KnifeMiniGameScene");
      return;
    }
    this.showLine();
  }
}
