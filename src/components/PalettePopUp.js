import React from 'react';

const PalettePopUp = ({ showPalettePopUp, setPalettePopUp, paletteWidth, setPaletteWidth, paletteHeight, setPaletteHeight, confirmPaletteDimension, cancelPaletteDimension }) => {
  return (
    <>
      {showPalettePopUp && (
        <div className="popup" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px' }}>
          <h2>Change Palette Dimension</h2>
          <label htmlFor="paletteWidth">Width:</label>
                <input
                  type="number"
                  id="paletteWidth"
                  value={paletteWidth}
                  onChange={(e) => setPaletteWidth(parseInt(e.target.value))}
                />
                <label htmlFor="paletteHeight">Height:</label>
                <input
                  type="number"
                  id="paletteHeight"
                  value={paletteHeight}
                  onChange={(e) => setPaletteHeight(parseInt(e.target.value))}
                />

          <button onClick={confirmPaletteDimension}>Confirm</button>
          <button onClick={cancelPaletteDimension}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default PalettePopUp;
