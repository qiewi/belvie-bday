let pianoContainer = document.getElementsByClassName("piano-container");
const base = "./audio/";
let sequence = []; // Array to store the sequence of clicked keys
const targetSequence = [2, 5, 5, 4, 4, 15, 2, 2, 5, 18, 18, 18, 5, 5, 4, 15, 18, 18, 18, 18, 5, 5, 4, 15, 14, 14, 14, 14, 2, 15]; // The target sequence to match
const sequenceDisplay = document.getElementById("sequence-display"); // Get the sequence display element
const sequenceValues = document.getElementById("sequence-values"); // Get the element to display sequence values
const skipButton = document.getElementById("skip-button"); // Get the Skip button

// Mapping of key indices to note names
const noteMapping = {
  1: "C#4",
  2: "D#4",
  3: "F#4",
  4: "G#4",
  5: "A#4",
  6: "C#5",
  7: "D#5",
  8: "F#5",
  9: "G#5",
  10: "A#5",
  11: "C4",
  12: "D4",
  13: "E4",
  14: "F4",
  15: "G4",
  16: "A4",
  17: "B4",
  18: "C5",
  19: "D5",
  20: "E5",
  21: "F5",
  22: "G5",
  23: "A5",
  24: "B5",
};

// Check if the sequence has been completed before
if (localStorage.getItem("sequenceCompleted") === "true") {
  skipButton.style.display = "inline-block"; // Show the Skip button
}

// Function to update the sequence display
function updateSequenceDisplay() {
  // Map the sequence indices to note names
  const noteSequence = sequence.map((keyIndex) => noteMapping[keyIndex]);
  sequenceValues.textContent = noteSequence.join(" - "); // Update the sequence values
}

// Reset button functionality
document.getElementById("reset-button").addEventListener("click", () => {
  sequence = []; // Reset the sequence
  updateSequenceDisplay(); // Update the display
});

// Skip button functionality
skipButton.addEventListener("click", () => {
  window.location.href = "hbd.html"; // Redirect to hbd.html
});

window.onload = () => {
  // 24 keys
  for (let index = 1; index <= 24; index++) {
    let div = document.createElement("div");
    div.classList.add("key", index <= 10 ? "black-key" : "white-key");

    // For playing audio on click
    const number = index <= 9 ? "0" + index : index;
    div.addEventListener("click", () => {
      new Audio(`${base}key${number}.mp3`).play();

      // Add the clicked key to the sequence
      sequence.push(index);
      updateSequenceDisplay(); // Update the display

      // Check if the sequence matches the target sequence
      if (sequence.length === targetSequence.length) {
        if (arraysMatch(sequence, targetSequence)) {
          localStorage.setItem("sequenceCompleted", "true"); // Store completion status
          window.location.href = "hbd.html"; // Redirect to hbd.html
        } else {
          sequence = []; // Reset the sequence
          updateSequenceDisplay(); // Update the display
        }
      }
    });

    pianoContainer[0].appendChild(div);
  }
};

// Helper function to compare two arrays
function arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}