import React, { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const FONT_SIZE = 16;
  let columns = [];
  let columnsCount = 0;
  

  class Column {
    constructor(x, fontSize, canvasHeight, context) {
      this.x = x;
      this.y = 0;
      this.fontSize = fontSize;
      this.canvasHeight = canvasHeight;
      this.context = context;
    }

    drawSymbol() {
      if (this.y === 0 && Math.random() < 0.98) {
        return;
      }
      const CHARACTERS = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
      const characterIndex = Math.floor(Math.random() * CHARACTERS.length);
      const symbol = CHARACTERS[characterIndex];

      this.context.fillText(symbol, this.x, this.y);

      if (this.y > this.canvasHeight) {
        this.y = 0;
      } else {
        this.y += this.fontSize;
      }
    }
  } 

  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function initCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initColumns() {
      columnsCount = canvas.width / FONT_SIZE;
      columns = [];
      for (let i = 0; i < columnsCount; i++) {
        columns.push(new Column(i * FONT_SIZE, FONT_SIZE, canvas.height, context));
      }
    }

    

    function animate() {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = 'green';
      context.font = `bold ${FONT_SIZE}px monospace`;
      columns.forEach(column => column.drawSymbol());

      setTimeout(() => requestAnimationFrame(animate), 50);
    }

    initCanvasSize();
    initColumns();

    animate();

    window.addEventListener('resize', () => {
      initCanvasSize();
      initColumns();
      context.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => window.removeEventListener('resize', () => {
      initCanvasSize();
      initColumns();
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  }, []);

  

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
  );
};

export default MatrixBackground;