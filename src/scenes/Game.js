import { Scene } from 'phaser';
import { Story } from 'inkjs';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;
        this.add.text(this.centerX, this.centerY, 'VNN', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5);
        const inkStoryContent = this.cache.json.get('inkStory');
        this.story = new Story(inkStoryContent);
        this.textObjects = [];
        this.choiceButtons = [];
        this.textY = this.cameras.main.height - this.centerY;
        console.log(inkStoryContent);
        //this.showNextContent('pepe_mosca');
        /*this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });*/
    }

    setBackground(knotName)
    {
      const fullPath = this.story.state.currentPathString;
      const currentKnot = this.story.currentPathString;
      // Remove the old background (if any) first
      if (this.currentBackground) {
        this.currentBackground.destroy();
      }
      const image = 'knot_' + knotName;
      this.currentBackground = this.add.image(this.centerX, this.centerY, image);
    }

    showNextContent(knotName)
    {
        this.clearChoices();
        this.textY = this.cameras.main.height - this.centerY;
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
            this.showNextContent(choice.targetPath.head.name);
          });
        });
      }

    addLine(line)
    {
      const txt = this.add.text(20, this.textY, line, { fontSize:'20px', fill:'#fff', wordWrap:{ width:760 } });
      this.textObjects.push(txt);
      this.textY += txt.height + 10;
    }

    addChoice(text, cb)
    {
      const btn = this.add.text(40, this.textY, `> ${text}`, { fontSize:'18px', fill:'#0f8' })
        .setInteractive().on('pointerdown', cb);
      this.choiceButtons.push(btn);
      this.textY += btn.height + 10;
    }

    clearChoices()
    {
      [...this.textObjects, ...this.choiceButtons].forEach(o => o.destroy());
      this.textObjects = [];
      this.choiceButtons = [];
    }
}