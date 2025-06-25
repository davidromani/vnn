import {Scene} from 'phaser';
import {Story} from 'inkjs';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;
        this.newLineDeltaY = 5;
        this.add.text(this.centerX, this.centerY / 6, 'VNN', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
        const inkStoryContent = this.cache.json.get('inkStory');
        this.story = new Story(inkStoryContent);
        this.textObjects = [];
        this.choiceButtons = [];
        console.log(this.cameras.main.height, this.centerY, inkStoryContent);
        this.showNextContent('pepe_mosca');
        /*this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });*/
    }

    setBackground(knotName) {
        const fullPath = this.story.state.currentPathString;
        const currentKnot = this.story.currentPathString;
        // Remove the old background (if any) first
        if (this.currentBackground) {
            this.currentBackground.destroy();
        }
        const image = 'knot_' + knotName; // TODO check if knot image name exists, else draw a default one
        this.currentBackground = this.add.image(this.centerX, this.centerY, image);
        this.currentBackground.setDepth(0);
    }

    showNextContent(knotName) {
        this.clearChoices();
        this.textY = this.centerY / 2;
        while (this.story.canContinue) {
            const line = this.story.Continue();
            this.addLine(line);
        }
        console.log('showNextContent', knotName);
        this.setBackground(knotName);
        this.story.currentChoices.forEach((choice, idx) => {
            console.log('choice', choice.targetPath, choice.targetPath.lastComponent);
            this.addChoice(choice.text, () => {
                this.story.ChooseChoiceIndex(idx);
                //this.showNextContent(choice.targetPath.head.name);
            });
        });
    }

    addLine(line) {
        console.log('line', line);
        const txt = this.add.text(20, this.textY, line, {fontSize: '20px', fill: '#fff', wordWrap: {width: 760}});
        txt.setDepth(1);
        this.textObjects.push(txt);
        this.textY += txt.height;
    }

    addChoice(text, cb) {
        const btn = this.add.text(40, this.textY, `> ${text}`, {fontSize: '18px', fill: '#0f8'})
            .setInteractive().on('pointerdown', cb);
        this.choiceButtons.push(btn);
        this.textY += btn.height + 10;
    }

    clearChoices() {
        [...this.textObjects, ...this.choiceButtons].forEach(o => o.destroy());
        this.textObjects = [];
        this.choiceButtons = [];
    }
}