import {Scene} from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        // this.add.image(512, 384, 'background');
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
        this.load.on('progress', (progress) => {
            bar.width = 4 + (460 * progress);
        });
    }

    preload() {
        // load the assets for the game - Replace with your own assets
        this.load.image('knot_bj', 'knots/bj.jpeg');
        this.load.image('knot_container', 'knots/container.jpeg');
        this.load.image('knot_final', 'knots/final.jpeg');
        this.load.image('knot_hot_cofee', 'knots/hot_cofee.jpeg');
        this.load.image('knot_pepe_mosca', 'knots/pepe_mosca.jpeg');
        this.load.image('knot_pizzeria', 'knots/pizzeria.jpeg');
        this.load.image('knot_pijo', 'knots/pijo.jpeg');
        this.load.image('knot_walk_her_home', 'knots/walk_her_home.jpeg');
        this.load.json('inkStory', 'story.json');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}