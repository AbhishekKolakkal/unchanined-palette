# Unchained Palette

## Overview

Unchained Palette is a React application that allows users to create and manage rectangles on a canvas. It provides features like adding rectangles, changing the palette dimension, and rotating rectangles.

## Additional NPM Packages Used

- konva: ^9.3.3
- react-konva: ^18.2.10

## System Requirements

- Node.js: v16.0.0
- React: v18.2.0

## Installation

1. Clone the repository
2. Navigate to the project directory: `cd unchained-palette`
3. Install dependencies: `npm install`

## Running the App

- To start the development server: `npm start`
- Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Upon launching the application, you'll see a canvas where you can add rectangles.
2. Click the "Add Boxes" button to open a popup for adding rectangles. Enter the width and height of the rectangle, then click "Add" to add it to the canvas.
3. You can also change the palette dimension by clicking the "Change Palette Dimension" button. Enter the new width and height, then click "Confirm" to apply the changes.
4. To rotate a rectangle 90 degree clockwise, click on the yellow button to rotate the rectangle .
5. To delete a rectangle, click on it to select it, then click on the yellow remove button.
6. If Palette dimension and boxes dimensions/dragging are unchanged on adding it will automatically arrange the boxes using a simple palettizer pattern. This pattern is defined in the App.js
7. Validation of collision of boxes can be seen while dragging.
8. Scale/zoom and Snapping/gridding is not implemented in this version.
