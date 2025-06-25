import {Scene} from 'phaser';
import {Story} from 'inkjs';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;
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
        this.showNextContent('pepe_mosca');
        // TODO set end of game scene action
        /*this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });*/
    }

    setBackground(knotName) {
        // console.log('setBackground knotName', knotName);
        if (this.currentBackground) {
            this.currentBackground.destroy();
        }
        const image = 'knot_' + knotName; // TODO check if knot image name exists, else draw a default one
        this.currentBackground = this.add.image(this.centerX, this.centerY, image);
        this.currentBackground.setDepth(0);
    }

    createTextButton(x, y, text, scene, cb) {
        // console.log('createTextButton', x, y, text, scene)
        // Create the text object
        const textObj = scene.add.text(0, 0, `> ${text}`, {
            fontSize: '18px',
            fill: '#0f8'
        })
            .setDepth(1)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', cb);
        // Calculate background size based on text
        const padding = 10;
        const width = textObj.width + padding * 2;
        const height = textObj.height + padding * 2;
        // Create a graphics object for the rounded rectangle
        const bg = scene.add.graphics();
        bg.lineStyle(2, 0x00ff88, 1)
            .fillStyle(0x000000, 1)
            .fillRoundedRect(0, 0, width, height, 8)
            .strokeRoundedRect(0, 0, width, height, 8);
        // Create a container to group text + background
        const container = scene.add.container(x, y, [bg, textObj]);
        textObj.setPosition(padding, padding); // Offset text inside box

        return container;
    }

    showNextContent() {
        this.clearChoices();
        this.textY = this.centerY / 2;
        while (this.story.canContinue) {
            const line = this.story.Continue();
            this.addLine(line);
        }
        this.textY = this.textY + 35;
        this.story.currentChoices.forEach((choice, idx) => {
            if (idx === 0) {
                const path = choice.sourcePath; // Example: "knotName.stitchName.0"
                const parts = path.split('.');
                if (parts.length > 0) {
                    this.setBackground(parts[0]);
                }
            }
            this.addChoice(choice.text, () => {
                this.story.ChooseChoiceIndex(idx);
                this.showNextContent();
            });
        });
    }

    addLine(line) {
        const txt = this.add.text(20, this.textY, line, {fontSize: '20px', fill: '#fff', wordWrap: {width: 760}});
        txt.setDepth(1);
        this.textObjects.push(txt);
        this.textY += txt.height;
    }

    addChoice(text, cb) {
        /*const btn = this.add.text(40, this.textY, `> ${text}`, {fontSize: '18px', fill: '#0f8'})
            .setInteractive().on('pointerdown', cb)
            .setDepth(1);*/
        // console.log('add Choice text, cb, this.textY', text, this.textY);
        const btn = this.createTextButton(40, this.textY, text, this, cb);
        this.choiceButtons.push(btn);
        this.textY += 60;
    }

    clearChoices() {
        [...this.textObjects, ...this.choiceButtons].forEach(o => o.destroy());
        this.textObjects = [];
        this.choiceButtons = [];
    }
}