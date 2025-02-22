let pianoContainer = document.getElementsByClassName("piano-container");
const base = "./audio/";
let sequence = []; // Array to store the sequence of clicked keys
const targetSequence = [5, 3, 2, 1, 2, 3, 1]; // The target sequence to match
const sequenceDisplay = document.getElementById("sequence-display"); // Get the sequence display element
const sequenceValues = document.getElementById("sequence-values"); // Get the element to display sequence values

// Function to update the sequence display
function updateSequenceDisplay() {
  sequenceValues.textContent = sequence.join(" - "); // Update the sequence values
}

// Reset button functionality
document.getElementById("reset-button").addEventListener("click", () => {
  sequence = []; // Reset the sequence
  updateSequenceDisplay(); // Update the display
  alert("Sequence reset. Try again.");
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
          window.location.href = "hbd.html";
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