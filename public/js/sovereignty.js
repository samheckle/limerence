function sovereignty_sketch() {
  // global variables
  let windowWidth; // holds width of container div
  let windowHeight; // height of container div
  let container; // container div
  let onContainer = false; // bool for if the mouse is on the container

  container = document.getElementById("sovereignty");

  // offset width / height includes margin + padding
  windowWidth = container.offsetWidth;
  windowHeight = container.offsetHeight;

  // p5 object
  const s = (sketch) => {
    let drawCounter = 0;
    let mouseXBound;
    let mouseYBound;
    var sourceText =
      "there is no sovereignty outside of relationships, we are always in a loosely woven state of becoming";
    var idx = 0;
    let clicked = false;
    let fontsize = 10;
    sketch.setup = () => {
      windowWidth = container.offsetWidth;
      windowHeight = container.offsetHeight;
      let canvas = sketch.createCanvas(windowWidth, windowHeight);
      canvas.parent("sovereignty");
      sketch.frameRate(15);
    };

    sketch.draw = () => {
      drawCounter++;
      sketch.copy(
        0,
        0,
        sketch.width,
        sketch.height,
        0,
        5,
        sketch.width,
        sketch.height
      );

      for (let x = 0; x < sketch.width; x += 50) {
        sketch.stroke(sketch.drawOrNot(x));
        sketch.strokeWeight(3);

        //text experiments
        var idx = sketch.map(
          sketch.mouseX,
          sketch.mouseY,
          sketch.width,
          0,
          sourceText.length
        );
        var stringPart = sourceText.substring(0, Math.floor(idx));
        sketch.textSize(fontsize);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);

        sketch.text(stringPart, windowWidth / 2, 0);
        idx++;
        if (idx > sourceText.length) {
          idx = 0;
        }
      }
    };

    sketch.drawOrNot = (x) => {
      let mouseXBound = sketch.map(sketch.mouseX, 0, sketch.width, 900, 1000);
      let mouseYBound = sketch.map(sketch.mouseY, 0, sketch.height, 50, 100);

      // This is just a magic formula that decides
      let magic_a = mouseXBound;
      let magic_b = mouseYBound;

      // This is a magic parameter
      let minus = x - drawCounter;
      let plus = x + drawCounter;
      let base = minus ^ plus;
      let colorDifferentiator = sketch.abs(drawCounter + Math.pow(base, 3));

      let shouldDraw;
      if (colorDifferentiator % magic_a < magic_b) {
        //if (colorDifferentiator % 997 < 97) {
        shouldDraw = true;
      } else {
        shouldDraw = false;
      }

      if (shouldDraw) {
        return sketch.color("black");
      } else {
        return sketch.color("white");
      }
    };

    sketch.mouseClicked = () => {
      if (onContainer) {
        if (clicked) {
          sketch.noLoop();
        } else {
          sketch.loop();
        }
        clicked = !clicked;
      }
    };
  };

  // changes onContainer value based if the mouse is on the canvas in the div
  container.addEventListener("mouseover", (e) => {
    onContainer = true;
  });
  container.addEventListener("mouseout", (e) => {
    onContainer = false;
  });

  // creates the p5 sketch instance
  return new p5(s);
}
