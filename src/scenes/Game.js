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
        this.cameras.main.setBackgroundColor(0x00ff00);
        const inkStoryContent = this.cache.json.get('inkStory');
        console.log(inkStoryContent);
        this.story = new Story(inkStoryContent);
        console.log('hit', this.story.ContinueMaximally());
        this.textObjects = [];
        this.choiceButtons = [];
        this.textY = 20;
        this.showNextContent();
        /*this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });*/
    }
    
    showNextContent() 
    {
        this.clearChoices();
        this.textY = 20;
        while (this.story.canContinue) {
          const line = this.story.Continue();
          this.addLine(line);
        }
        this.story.currentChoices.forEach((choice, idx) => {
          this.addChoice(choice.text, () => {
            this.story.ChooseChoiceIndex(idx);
            this.showNextContent();
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