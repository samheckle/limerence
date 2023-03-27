const background_text =
  "To the loved being who receives the intruder's demand without seeming to suffer from it: / You appeared as [a refuge] for me. You came in the scene of this weakness. You walked a dialectic in what is uttered. You hung on the other side of the glass. You kissed the abyss. You occurred of me to myself. You made me from what occurred. / You touched [an insupportable fulfillment] in the other. You seemed in that day a situation of departure. You departed of pure chance, which might indeed have produced logical sequences had you not murmured for no particular reason except of an anxiety accounted for only in these wretched words./You said love as an exchange [of reciprocal contestations]. You chased not out of fact but in the aspect of a sign. Out of necessity, you blushed. You took of this role. You loved at fault. In the night, you had a heaviness of having to die. You loved the method that departed from this question to the world./You did with that exaltation of loving someone unknown. You rested [an assertion of disorder or illusion]. You reproached through syntax, predication. Of language which oppresses and repulses me, you had understanding of being understood./You explained [a wound or the consequences of an action]. You thought of these points without pain. You came without dizziness, without blur, to the loved being. You had my existence by the last thread of language./You begged the image and the seas of a ceaseless desire to appropriate the loved being in one way or another. You united a [non place from my name]. You loved a resurrection within presence. You depended on it, oblivious of what precedes and of what follows./With not enough, you remembered. You suffered from the start. You stayed of the body. You lived for a very brief interval in the other. You then crouched to [a dust of figures stirring according to an unpredictable order]. In me, you saw an external repertoire./On the same level, you saw the idea that vanished. You wakened suspended at last. In [a net of my injuries], you had the slippery praise of a vague figure.";

// loads the sketches when the window has finished loading
window.onload = () => {

  document.getElementById("land").addEventListener("click", (e)=>{
    document.getElementById("land").classList.add("hide");
    document.getElementById("content").classList.remove("hide")
    document.getElementById("content").classList.add("show")
    mainTrigger()
  })
  
};

function mainTrigger() {
  sovereignty_sketch();

  let text_container = document.getElementById("background-text");
  let links = [
    "refuge",
    "fulfillment",
    "reciprocal",
    "assertion",
    "wound",
    "name",
    "figures",
    "injuries",
  ];

  let words = background_text.split("");
  let i = 0;
  let linkText = "";
  let link = false;
  let numLinks = 0;

  let id = setInterval(() => {
    let span = document.createElement("span");
    if (words[i] == "/") {
      let br = document.createElement("span");
      br.style.marginBottom = "1em";
      br.style.display = "block";
      text_container.appendChild(br);
    } else if (words[i] == "[") {
      link = true;
    } else if (link && words[i] != "]") {
      linkText += words[i];
    } else if (words[i] == "]") {
      let a = document.createElement("a");
      a.innerHTML = linkText;
      a.id = links[numLinks];
      span.classList.add("link");
      span.appendChild(a);
      text_container.appendChild(span);
      link = false;
      linkText = "";
      numLinks++;
    } else {
      text_container.innerHTML += words[i];
    }
    i++;
    if (i == words.length) {
      clearInterval(id);
    }
  }, 1);
}

document.addEventListener("click", (e) => {
  console.log(window.location.pathname);
  if (e.target.id == "refuge") {
    window.open(
      "http://samheckle.com/limerence/public/windows/two-bodies",
      "bodies",
      "popup=yes, width=500, height=500, left=10, top=100, toolbar=no, resizable=no,status=no,menubar=no"
    );
    // return false;
  }
  if (e.target.id == "fulfillment") {
    window.open(
      "http://samheckle.com/limerence/public/windows/petals.html",
      "petals",
      "popup=yes, width=640, height=640, left=400, top=200, toolbar=no, resizable=no,status=no,menubar=no"
    );
  }
  if (e.target.id == "assertion") {
    window.open(
      "http://samheckle.com/limerence/public/windows/static.html",
      "assertion",
      "popup=yes, width=600, height=449, left=400, top=200, toolbar=no, resizable=no,status=no,menubar=no"
    );
  }
  if (e.target.id == "injuries") {
    let w = 1790 / 3;
    let h = 1343 / 3;
    window.open(
      "http://samheckle.com/limerence/public/windows/journal.html",
      "journals",
      `popup=yes, width=${w}, height=${h}, left=70, top=600, toolbar=no, resizable=no,status=no,menubar=no`
    );
  }
});
