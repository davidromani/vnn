import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        //this.add.image(512, 300, 'logo');

        this.add.text(512, 60, 'VNN', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5);

        /*this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });*/
        this.scene.start('Game');
    }
}