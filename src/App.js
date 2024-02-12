import React, { useState, useRef } from 'react';
import CanvasComponent from "./components/CanvasComponent";
import BoxPopUp from "./components/BoxPopUp";
import PalettePopUp from "./components/PalettePopUp";

const App = () => {
  const [canvasDimension, setCanvasDimension] = useState({ width: 850, height: 1250 });
  const [showBoxPopUp, setBoxesPopUp] = useState(false);
  const [showPalettePopUp, setPalettePopUp] = useState(false);
  const [paletteWidth, setPaletteWidth] = useState(canvasDimension.width);
  const [paletteHeight, setPaletteHeight] = useState(canvasDimension.height);
  const rectanglesDataRef = useRef({});
  const [count, setCount] = useState(0);
  const [previousCoOrdinates, setPreviousCoOrdinates] = useState({ x: 0, y: 0 });
  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);
  const [boxWidth, setBoxWidth] = useState(200);
  const [boxHeight, setBoxHeight] = useState(300);

  const addRectangle = () => {
    setBoxesPopUp(false);
    
    // Simple Palette Pattern Logic before Adding a Rectangle
    let xCoOrdinate, yCoOrdinate;
    const spacing = 5;
    const maxRows = Math.floor((paletteHeight) / (boxHeight + spacing)); 
    const maxCols = Math.floor((paletteWidth) / (boxWidth + spacing));
    
    if (rowCount == 0 && columnCount == 0) {
      xCoOrdinate = previousCoOrdinates.x + boxWidth/2 + spacing;
      yCoOrdinate = previousCoOrdinates.y + boxHeight/2 + spacing;
      setColumnCount(columnCount + 1);
    } else if (columnCount < maxCols && columnCount > 0) {
      xCoOrdinate = previousCoOrdinates.x + boxWidth + spacing;
      yCoOrdinate = previousCoOrdinates.y;
      setColumnCount(columnCount + 1);
    } else {
      xCoOrdinate = previousCoOrdinates.x + boxWidth/2 + spacing;
      yCoOrdinate = previousCoOrdinates.y;
      setColumnCount(columnCount + 1);
    }
    
    if (columnCount == maxCols - 1) {
      setRowCount(rowCount + 1);
      setColumnCount(0);
      setPreviousCoOrdinates({ x: 0, y: previousCoOrdinates.y + boxHeight + spacing }); 
    } else {
      setPreviousCoOrdinates({ x: xCoOrdinate, y: yCoOrdinate });
    }
    
    const newRectangle = {
      x: xCoOrdinate,
      y: yCoOrdinate,
      id: count,
      rotation: 0,
      width: boxWidth,
      height: boxHeight
    };
    
    setCount(count + 1);
    rectanglesDataRef.current = newRectangle;
  };

  const changePaletteDimension = () => {
    setPalettePopUp(true);
  };

  const confirmPaletteDimension = () => {
    setCanvasDimension({ width: paletteWidth, height: paletteHeight });
    setPalettePopUp(false);
  };

  const cancelPaletteDimension = () => {
    setPaletteWidth(canvasDimension.width);
    setPaletteHeight(canvasDimension.height);
    setPalettePopUp(false);
  };

  return (
    <div>
      <CanvasComponent
        canvasDimension={canvasDimension}
        rectanglesDataRef={rectanglesDataRef.current}
      />
      <BoxPopUp
        showBoxPopUp={showBoxPopUp}
        setBoxesPopUp={setBoxesPopUp}
        addRectangle={addRectangle}
        setBoxWidth={setBoxWidth}
        setBoxHeight={setBoxHeight}
        boxWidth={boxWidth}
        boxHeight={boxHeight}
      />
      <PalettePopUp
        showPalettePopUp={showPalettePopUp}
        setPalettePopUp={setPalettePopUp}
        paletteWidth={paletteWidth}
        setPaletteWidth={setPaletteWidth}
        paletteHeight={paletteHeight}
        setPaletteHeight={setPaletteHeight}
        confirmPaletteDimension={confirmPaletteDimension}
        cancelPaletteDimension={cancelPaletteDimension}
      />
      <button onClick={() => setBoxesPopUp(true)}>Add Boxes</button>
      <button onClick={changePaletteDimension}>Change Palette Dimension</button>
    </div>
  );
};

export default App;
