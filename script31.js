document.addEventListener("DOMContentLoaded", function () {
  const car = document.getElementById("car");
  const grid = document.getElementById("grid");
  const logTableBody = document.querySelector("#logTable tbody");
  const status = document.getElementById("status");
  let carX = 7;
  let carY = 7;
  let stepCount = 1;

  for (let i = 0; i < 64; i++) {
    const cell = document.createElement("div");
    grid.appendChild(cell);
  }

  const toolbox = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Hareket",
        colour: "#5b80a5",
        contents: [
          { kind: "block", type: "move_forward" },
          { kind: "block", type: "move_backward" },
        ],
      },
      {
        kind: "category",
        name: "Dönüş",
        colour: "#5ba55b",
        contents: [
          { kind: "block", type: "turn_right" },
          { kind: "block", type: "turn_left" },
        ],
      },
    ],
  };

  const workspace = Blockly.inject("blocklyDiv", {
    toolbox: toolbox,
    trashcan: true,
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2
    }
  });

  Blockly.defineBlocksWithJsonArray([
    {
      type: "move_forward",
      message0: "İleri git %1 birim",
      args0: [{ type: "field_number", name: "DISTANCE", value: 1 }],
      colour: "#5b80a5",
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: "move_backward",
      message0: "Geri git %1 birim",
      args0: [{ type: "field_number", name: "DISTANCE", value: 1 }],
      colour: "#a55b80",
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: "turn_right",
      message0: "Sağa dön %1 birim",
      args0: [{ type: "field_number", name: "DISTANCE", value: 1 }],
      colour: "#5ba55b",
      previousStatement: null,
      nextStatement: null,
    },
    {
      type: "turn_left",
      message0: "Sola dön %1 birim",
      args0: [{ type: "field_number", name: "DISTANCE", value: 1 }],
      colour: "#a5a55b",
      previousStatement: null,
      nextStatement: null,
    },
  ]);

  document.getElementById("runCode").addEventListener("click", function () {
    logTableBody.innerHTML = "";
    stepCount = 1;
    status.textContent = "Başlatıldı!";
    carX = 7;
    carY = 7;

    const blocks = workspace.getAllBlocks();
    for (const block of blocks) {
      const distance = parseInt(block.getFieldValue("DISTANCE"));

      switch (block.type) {
        case "move_forward":
          carY -= distance;
          log("İleri git", distance);
          break;
        case "move_backward":
          carY += distance;
          log("Geri git", distance);
          break;
        case "turn_right":
          carX += distance;
          log("Sağa dön", distance);
          break;
        case "turn_left":
          carX -= distance;
          log("Sola dön", distance);
          break;
      }

      if (carX < 0 || carX > 7 || carY < 0 || carY > 7) {
        alert("⚠️ Araç alan dışına çıktı!");
        carX = Math.max(0, Math.min(7, carX));
        carY = Math.max(0, Math.min(7, carY));
      }
    }

    car.style.left = `${carX * 12.5}%`;
    car.style.top = `${carY * 12.5}%`;
  });

  function log(action, value) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${stepCount++}</td><td>${action}</td><td>${value}</td>`;
    logTableBody.appendChild(row);
    console.log(`${action}: ${value} birim`);
  }
});
