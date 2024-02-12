import React, { useEffect, useState, useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";

const CanvasComponent = ({ rectanglesDataRef, canvasDimension }) => {
  console.log(canvasDimension.width, canvasDimension.height)
  const rotationsCountsRef = useRef({});
  const [rectanglesData, setRectanglesData] = useState([]);
  useEffect(() => {
    if (!Object.keys(rectanglesDataRef).length == 0) {
      setRectanglesData((state) => [...state, rectanglesDataRef]);
    }
  }, [rectanglesDataRef]);


  useEffect(() => {

    // Constructing Stage 
    const stage = new Konva.Stage({
      container: "container",
      width: canvasDimension.width,
      height: canvasDimension.height,
    });

    const layer = new Konva.Layer();
    stage.add(layer);
    rectanglesData.forEach((data, index) => {
      const group = new Konva.Group({
        x: data.x,
        y: data.y,
        draggable: true,
        rotation: data.rotation
      });
      group.setAttrs({
        id: data.id,
      })
      const shape = new Konva.Rect({
        width: data.width,
        height: data.height,
        fill: "blue",
        name: "fillShape",
        offsetX: data.width/2,
        offsetY: data.height/2,
      });

      const button = new Konva.RegularPolygon({
        x: data.width / 4,
        y: data.width / 4,
        sides: 4,
        radius: 20,
        fill: "red",
        draggable: false,
        rotation: 0,
      });


      const removeButton = new Konva.RegularPolygon({
        x: -80,
        y: -80,
        sides: 4,
        radius: 20,
        fill: "yellow",
        draggable: false,
        rotation: 0,
      });

      removeButton.on("click", () => {
        group.destroy();
        layer.batchDraw();
        const updatedRectangles = rectanglesData.filter(
          (rect) => rect.id !== data.id
        );
        setRectanglesData(updatedRectangles);
      });

      button.on("click", (e) => {
        group.rotate(90);
        layer.batchDraw();
        rotationsCountsRef.current = {
          ...rotationsCountsRef.current,
          [group.attrs.id]: rotationsCountsRef.current[group.attrs.id] + 1 || 1,
        };
      });


      const text = new Konva.Text({
        text: `(${data.x}, ${Math.abs(canvasDimension.height - data.y)})`,
        x: 10,
        y: 10,
        fill: "white",
      });

      // Adding All Shapes and Button to the stage
      group.add(shape);
      group.add(button);
      group.add(text);
      group.add(removeButton);
      layer.add(group);


      group.on("dragmove", (e) => {
        const target = e.target;
        let newX, newY;

        if ((target.rotation() % 4) > 0) {
          newX = Math.max(data.height/2, Math.min(canvasDimension.width - data.height/2, target.x()));
          newY = Math.max(data.width/2, Math.min(canvasDimension.height - data.width/2, target.y()));
        } else {
          newX = Math.max(data.width/2, Math.min(canvasDimension.width - data.width/2, target.x()));
          newY = Math.max(data.height/2, Math.min(canvasDimension.height - data.height/2, target.y()));
        }

        target.position({ x: newX, y: newY });
        const targetRect = target.getClientRect();
        layer.children.forEach((child) => {
          if (
            child !== group &&
            haveIntersection(child.getClientRect(), targetRect)
          ) {
            child.findOne(".fillShape").fill("red");
          } else {
            child.findOne(".fillShape").fill("blue");
          }
        });
        text.text(`(${newX}, ${Math.abs(canvasDimension.height - newY)})`);
        layer.batchDraw();
      });
      group.on("dragend", (e) => {
        // Updating new Co-ordinates when the drag has ended for a Box
        const newRectanglePostion = {x: e.target.x(), y: e.target.y(), id: e.target.id(), rotation: e.target.rotation(), width: e.target.children[0].attrs.width, height: e.target.children[0].attrs.height};
        const index = rectanglesData.findIndex(rectangle => rectangle.id === newRectanglePostion.id);
        const updatedRectanglesData = [...rectanglesData];
        updatedRectanglesData[index] = newRectanglePostion;
        setRectanglesData(updatedRectanglesData);
      });
    });
  }, [rectanglesData, canvasDimension.width, canvasDimension.height]);

  // Logic for collision detection
  const haveIntersection = (r1, r2) => {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  };

  return (
    <div
      id="container"
      style={{
        background: "grey",
        width: canvasDimension.width.toString() + "px",
        height: canvasDimension.height.toString() + "px",
        position: "relative",
      }}
    >
      <Stage width={canvasDimension.width} height={canvasDimension.height}>
        <Layer></Layer>
      </Stage>
    </div>
  );
};

export default CanvasComponent;
