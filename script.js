let wordsPerMin = document.querySelector(".wpm span");
let charsPerMin = document.querySelector(".cpm span");
let accuracy = document.querySelector(".accuracy span");
let paragraph = document.querySelector(".paragraph");
let userTyping = document.querySelector("textarea");
let time = document.querySelector(".time span");
let footerDivs = document.querySelectorAll("footer div");
let mistakes = document.querySelector("#mistakes");
//console.log(wordsPerMin.innerText)
let tryAgain = footerDivs[2];
//working with timer
let timer = null;
let minTime = 0;
let timeValue = minTime;
isTyping = true;

function getTime(){
if(timeValue>=0){
    timeValue++;
    time.innerText = timeValue;
}
}


paragraph.innerHTML = "";
//storing array of paragraphs in "paragraphs variable"
let paragraphs = ["The sun was setting behind the mountains, casting a warm glow across the meadow. Birds chirped happily as they flew back to their nests, and a gentle breeze rustled through the tall grass. It was a peaceful evening, a moment of serenity in the midst of a busy world.",
"The smell of freshly brewed coffee filled the air, enticing everyone in the room. The rich aroma mingled with the sound of friendly chatter, creating a welcoming atmosphere. People gathered around the cozy café, savoring their drinks and enjoying each other's company.",
"The little girl clutched her favorite stuffed toy tightly as she entered the unfamiliar room. With wide eyes, she took in the colorful walls and toys scattered on the floor. Slowly, a smile spread across her face, and she began to explore, her curiosity outweighing any apprehension.",
"The waves crashed against the shore, their rhythmic motion creating a soothing sound. Seagulls soared above, their cries blending with the salty breeze. The beach was a place of solace, where one could find solace in the vastness of the ocean and the beauty of nature.",
"The first snowflake gently fell from the sky, twirling in the air before landing on the ground. Soon, more followed, covering the landscape in a blanket of white. Children ran outside, their laughter echoing through the winter wonderland, as they built snowmen and engaged in playful snowball fights."
]

let charIndex = 0;
//rendering paragraph at random index
function randomParagraph(){
let randomIndex = Math.floor(Math.random() * paragraphs.length);
//splitting each sentence's words into characters
let characters = paragraphs[randomIndex].split("");
//pushing each characters's element into span tag and assigning it to paragraph's innerHTML
characters.forEach(e=>{
let char = `<span>${e}</span>`
paragraph.innerHTML += char;
})

} 
randomParagraph();




function userText(){
let paraCharacters = paragraph.querySelectorAll("span");
let typedChar = userTyping.value.split("")[charIndex];
//start the timer for isTyping is true
if(isTyping){
timer = setInterval(getTime,1000);
isTyping = false;
}

//if user had not typed anything or pressed backspace
if(typedChar == null){
    charIndex--;
    paraCharacters[charIndex].classList.remove("correct","incorrect");
    paraCharacters[charIndex].style.fontWeight = "400";
    mistakes.innerText--;
}
else{
paraCharacters[charIndex].style.fontWeight = "900";
if(paraCharacters[charIndex].innerText===typedChar){
    paraCharacters[charIndex].classList.add("correct");
    
    
}
else{
    paraCharacters[charIndex].classList.remove("correct");
    paraCharacters[charIndex].classList.add("incorrect");
    mistakes.innerText++;
}
charIndex++;
}
//calculating the correct keys
let userInput = userTyping.value;
let correctKeys = 0;
for (let i = 0; i < userInput.length; i++) {
  if (userInput[i] === paraCharacters[i].innerText) {
    correctKeys++;
  }
}
//wpm,cpm,accuracy
//wpm = (total keys pressed/5)/time elapsed in minutes
wordsPerMin.innerText = Math.floor((userTyping.value.length/5)/(timeValue/60));
//cpm = (total typed characters)/time elapsed in minutes
charsPerMin.innerText = Math.floor((userTyping.value.length)/(timeValue/60));
//accuracy = (correct keys pressed/total keys pressed)*100
accuracy.innerText = Math.floor((correctKeys/userTyping.value.length)*100)
// check if user has finished typing the entire paragraph
if (charIndex === paraCharacters.length) {
    clearInterval(timer);
  }
}
tryAgain.addEventListener("click", function() {
  // Clear the text field
  userTyping.value = "";
  
  // Reset variables
  charIndex = 0;
  timeValue = minTime;
  isTyping = true;
  mistakes.innerText = "0";

  // Clear the timer if it's running
  clearInterval(timer);
  time.innerText = timeValue;

  // Clear the paragraph and generate a new random one
  paragraph.innerHTML = "";
  randomParagraph();
});

//cpm = (total typed characters)/time elapsed in minutes
//accuracy = (total keys pressed/correct keys pressed)*100
