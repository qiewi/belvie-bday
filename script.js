let pianoContainer = document.getElementsByClassName("piano-container");
const base = "./audio/";
let sequence = []; // Array to store the sequence of clicked keys
const targetSequence = [5, 3, 2, 1, 2, 3, 1]; // The target sequence to match

document.getElementById("reset-button").addEventListener("click", () => {
    sequence = []; // Reset the sequence
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
      
      // Check if the sequence matches the target sequence
      if (sequence.length === targetSequence.length) {
        if (arraysMatch(sequence, targetSequence)) {
          // Redirect to index.html if the sequence matches
          window.location.href = "index.html";
        } else {
          // Reset the sequence if it doesn't match
          sequence = [];
          alert("Wrong sequence! Try again.");
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