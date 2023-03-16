function two_bodies_sketch() {
  // global variables
  let windowWidth; // holds width of container div
  let windowHeight; // height of container div
  let container; // container div
  let onContainer = false; // bool for if the mouse is on the container

  //   window.onload = () => {
  container = document.getElementById("two-bodies");

  // offset width / height includes margin + padding
  windowWidth = container.offsetWidth
  windowHeight = container.offsetHeight

  // p5 object
  const s = (sketch) => {
    /******************
Code forked from Vamoss (http://vamoss.com.br)
Original code link:
https://www.openprocessing.org/sketch/697891
******************/

    const textToWrite =
      "the    distance    between    two    bodies                                                                                         ooʇ    ʎpoq    ɐ    ɟlǝsʇᴉ    sᴉ";
    const SEGMENTS = 100;

    //auto start variables
    let centerX, centerY, fontSize, INNER_RADIUS, RADIUS_VARIATION;

    sketch.setup = () => {
      let canvas = sketch.createCanvas(windowWidth, windowHeight);
      canvas.parent("two-bodies");
      centerX = windowWidth / 2;
      centerY = windowHeight / 2;

      let screenPct = sketch.min(sketch.height, sketch.width) / 1000;

      fontSize = screenPct * 20;
      INNER_RADIUS = screenPct * 140;
      RADIUS_VARIATION = screenPct * 150;

      //textLeading(20);
      sketch.textFont("Helvetica");
      sketch.textSize(fontSize);
    };

    //code adapted from @GoToLoop
    //generates a circular noise with perfect looping
    //https://forum.processing.org/one/topic/how-to-make-perlin-noise-loop.html
    sketch.pointForIndex = (pct) => {
      const NOISE_SCALE = 1.5;
      let angle = pct * sketch.TWO_PI;
      let cosAngle = sketch.cos(angle);
      let sinAngle = sketch.sin(angle);
      let time = sketch.frameCount / 300;
      let noiseValue = sketch.noise(
        NOISE_SCALE * cosAngle + NOISE_SCALE,
        NOISE_SCALE * sinAngle + NOISE_SCALE,
        time
      );
      let radius = INNER_RADIUS + RADIUS_VARIATION * noiseValue;
      return {
        x: radius * cosAngle + centerX,
        y: radius * sinAngle + centerY,
      };
    };

    sketch.draw = () => {
      sketch.background(255);
      sketch.fill(0);
      sketch.noStroke();

      //draw text
      let pct = 0;
      if (onContainer) {
        pct =
          sketch.atan2(sketch.mouseY - centerY, sketch.mouseX - centerX) /
          sketch.TWO_PI; //follow mouse
      }
      //   let pct =
      //     sketch.atan2(sketch.mouseY - centerY, sketch.mouseX - centerX) /
      //     sketch.TWO_PI; //follow mouse
      //let pct = 0;//dont follow mouse
      let pixToAngularPct =
        1 / ((INNER_RADIUS + RADIUS_VARIATION / 2) * sketch.TWO_PI);
      for (var i = 0; i < textToWrite.length; i++) {
        let charWidth = sketch.textWidth(textToWrite.charAt(i));
        pct += (charWidth / 2) * pixToAngularPct;

        //calculate angle
        let leftP = sketch.pointForIndex(pct - 0.01);
        let rightP = sketch.pointForIndex(pct + 0.01);
        let angle =
          sketch.atan2(leftP.y - rightP.y, leftP.x - rightP.x) + sketch.PI;

        sketch.push();
        let p = sketch.pointForIndex(pct);
        //apply angle
        sketch.translate(p.x, p.y);
        sketch.rotate(angle);
        sketch.translate(-p.x, -p.y);

        sketch.text(textToWrite.charAt(i), p.x - charWidth / 2, p.y);
        sketch.pop();

        pct += (charWidth / 2) * pixToAngularPct;
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
  //   };
}
