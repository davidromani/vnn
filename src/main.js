import Phaser from 'phaser';

import { Boot } from './scenes/Boot.js';
import { Game } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';
import { MainMenu } from './scenes/MainMenu.js';
import { Preloader } from './scenes/Preloader.js';

// available configuration options https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#191970',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ]
};

export default new Phaser.Game(config);