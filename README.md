# Virtual Novel by Nico v0.1

This is a virtual novel proof-of-concept written with [inkjs](https://www.inklestudios.com/ink/).


## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm` (if you want to use the development server).

## Installation

1. Download source code ZIP file from [here](https://github.com/davidromani/vnn/archive/refs/heads/main.zip). 
2. Unzip it.
3. Open your terminal and change to your unzipped folder.
4. Execute following available commands.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Launch a development web server |

## Writing Code

After cloning the repo, you will need a server to serve the resources of your game. This template provides your own server with hot-reloading. To start it, simply run `npm run dev`.

The local development server runs on `http://localhost:3000` by default.

## Story files

Edit main story file `assets/story.ink` with Inky app ([download here](https://www.inklestudios.com/ink/)). Finally export to JSON file an save to `assets/story.json`.

Keep file names. Reload browser to refresh the new story created.

## Project Structure

We have provided a default project structure to get you started. This is as follows:

- `assets/` - Contains the static assets and the Story files used by the game.
- `src/` - Contains the game source code.
- `src/scenes/` - The Phaser Scenes are in this folder.
- `src/main.js` - The main entry point. This contains the game configuration and starts the game.
- `index.html` - A basic HTML page to contain the game.
- `style.css` - Some simple CSS rules to help with page layout.