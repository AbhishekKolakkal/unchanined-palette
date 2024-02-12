import React from 'react';

const BoxPopUp = ({ showBoxPopUp, setBoxesPopUp, addRectangle, setBoxWidth, setBoxHeight, boxWidth, boxHeight }) => {
  return (
    <>
      {showBoxPopUp && (
        <div className="popup" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px' }}>
          <h2>Add Rectangle</h2>
          <label htmlFor="width">Width:</label>
                <input
                  type="number"
                  id="width"
                  value={boxWidth}
                  onChange={(e) => setBoxWidth(parseInt(e.target.value))}
                />
                <label htmlFor="height">Height:</label>
                <input
                  type="number"
                  id="height"
                  value={boxHeight}
                  onChange={(e) => setBoxHeight(parseInt(e.target.value))}
                />

          <button onClick={addRectangle}>Add</button>
          <button onClick={() => setBoxesPopUp(false)}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default BoxPopUp;
