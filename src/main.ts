import Phaser from "phaser";
import { TitleScene } from "./scenes/TitleScene";
import { StoryScene } from "./scenes/StoryScene";
import { KnifeMiniGameScene } from "./scenes/KnifeMiniGameScene";
import { ResultScene } from "./scenes/ResultScene";

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "app",
  backgroundColor: "#1b1b1b",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 450,
    height: 800,
  },
  scene: [TitleScene, StoryScene, KnifeMiniGameScene, ResultScene],
});
