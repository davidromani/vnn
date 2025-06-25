import {Scene} from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        //this.add.image(512, 384, 'background');
        this.add.text(centerX, centerY, 'VNN', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);
        // TODO add main menu info to display and wait a click to start
        /*this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });*/
        this.scene.start('Game');
    }
}