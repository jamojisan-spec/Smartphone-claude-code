import Phaser from "phaser";

const TOTAL_ROUNDS = 5;

type Judgment = "的中" | "惜しい" | "外れ";

export class KnifeMiniGameScene extends Phaser.Scene {
  private round = 0;
  private results: Judgment[] = [];

  private track!: Phaser.GameObjects.Rectangle;
  private target!: Phaser.GameObjects.Rectangle;
  private bullseye!: Phaser.GameObjects.Rectangle;
  private marker!: Phaser.GameObjects.Text;
  private markerTween?: Phaser.Tweens.Tween;
  private judgmentText!: Phaser.GameObjects.Text;
  private roundText!: Phaser.GameObjects.Text;

  private trackLeft = 0;
  private trackRight = 0;

  constructor() {
    super("KnifeMiniGameScene");
  }

  create(): void {
    const { width, height } = this.scale;

    this.round = 0;
    this.results = [];

    this.add.rectangle(width / 2, height / 2, width, height, 0x1b1b1b);

    this.add
      .text(width / 2, height * 0.14, "🎯 包丁さばき", {
        fontSize: "24px",
        color: "#f5e6c8",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height * 0.2, "的の真ん中でタップ！", {
        fontSize: "14px",
        color: "#c9a86a",
      })
      .setOrigin(0.5);

    this.roundText = this.add
      .text(width / 2, height * 0.26, "", { fontSize: "13px", color: "#ffffff" })
      .setOrigin(0.5);

    const trackY = height * 0.45;
    this.trackLeft = width * 0.12;
    this.trackRight = width * 0.88;

    this.track = this.add.rectangle(
      width / 2,
      trackY,
      this.trackRight - this.trackLeft,
      10,
      0x444444,
    );

    this.target = this.add.rectangle(width / 2, trackY, 70, 30, 0xc9a86a, 0.5);
    this.bullseye = this.add.rectangle(width / 2, trackY, 24, 30, 0x8b1e1e);

    this.marker = this.add
      .text(this.trackLeft, trackY, "🔪", { fontSize: "28px" })
      .setOrigin(0.5);

    this.judgmentText = this.add
      .text(width / 2, height * 0.58, "", { fontSize: "22px", color: "#ffffff" })
      .setOrigin(0.5);

    this.input.on("pointerdown", () => this.handleTap());

    this.startRound();
  }

  private startRound(): void {
    this.roundText.setText(`${this.round + 1} / ${TOTAL_ROUNDS} 回目`);
    this.judgmentText.setText("");

    this.marker.x = this.trackLeft;
    this.markerTween?.stop();
    this.markerTween = this.tweens.add({
      targets: this.marker,
      x: this.trackRight,
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  private handleTap(): void {
    this.markerTween?.pause();

    const distance = Math.abs(this.marker.x - this.target.x);
    let judgment: Judgment;
    if (distance <= 12) {
      judgment = "的中";
    } else if (distance <= 35) {
      judgment = "惜しい";
    } else {
      judgment = "外れ";
    }

    this.results.push(judgment);
    this.judgmentText.setText(judgment);

    this.time.delayedCall(500, () => {
      this.round += 1;
      if (this.round >= TOTAL_ROUNDS) {
        this.markerTween?.stop();
        this.scene.start("ResultScene", { results: this.results });
        return;
      }
      this.startRound();
    });
  }
}
