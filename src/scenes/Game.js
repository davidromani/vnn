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
        this.add.text(512, 60, 'VNN', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2,
            align: 'center'
        }).setOrigin(0.5);
        const inkStoryContent = this.cache.json.get('inkStory');
        this.story = new Story(inkStoryContent);
        this.textObjects = [];
        this.choiceButtons = [];
        this.textY = 180;
        this.showNextContent('pepe_mosca');
        /*this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });*/
    }

    setBackground(knotName)
    {
      // Remove the old background (if any) first
      if (this.currentBackground) {
        this.currentBackground.destroy();
      }
      const centerX = this.cameras.main.width / 2;
      const centerY = this.cameras.main.height / 2;
      // Set new background based on the knot name
      switch (knotName) {
        case 'pepe_mosca':
          this.currentBackground = this.add.image(centerX, centerY, 'knot_pepe_mosca');
          break;
        case 'container':
          this.currentBackground = this.add.image(centerX, centerY, 'knot_pepe_mosca');
          break;
        case 'pizzeria':
          this.currentBackground = this.add.image(centerX, centerY, 'knot_pizzeria');
          break;
        case 'pijo':
          this.currentBackground = this.add.image(centerX, centerY, 'knot_pijo');
          break;
        case 'walk_her_home':
          this.currentBackground = this.add.image(centerX, centerY, 'knot_walk_her_home');
          break;
        default:
          this.currentBackground = this.add.image(centerX, centerY, 'knot_pizzeria');
      }
    }

    showNextContent(knotName)
    {
        this.clearChoices();
        this.textY = 180;
        this.setBackground(knotName);
        while (this.story.canContinue) {
          const line = this.story.Continue();
          this.addLine(line);
        }
        this.story.currentChoices.forEach((choice, idx) => {
          this.addChoice(choice.text, () => {
            this.story.ChooseChoiceIndex(idx);
            this.showNextContent(choice.targetPath[0]);
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
