const resetBtn = document.querySelector('.reset');
const timer = document.querySelector('.timer');
const carrotNum = document.querySelector('.carrot__num');
const footer = document.querySelector('footer');

const carrot = document.createElement('img');
carrot.setAttribute('id', 'carrot');
carrot.src = "img/carrot.png";

let onGame = 0;
let count = 0;
let intervalID = 0;

const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');

function onTimer(){
  let time = 10;
  timer.innerHTML = '00:10';
  clearInterval(intervalID);
  intervalID = setInterval(() => {
    timer.innerHTML = '00:0' + (--time);
    if (time <= 0)
      lost();
  }, 1000);
}

function onItems(url, id){
  const item = document.createElement('img');
  item.src = url;
  item.setAttribute('id', id);
  
  const width = footer.offsetWidth - item.width;
  const height = footer.offsetHeight - item.height;

  const x = Math.floor(Math.random() * width) ;
  const y = Math.floor(Math.random() * height) ;

  item.style.left = x + 'px';
  item.style.top = y + 'px';
  footer.appendChild(item);
}

function setGame(){
  count = 10;
  bgSound.currentTime = 0;
  bgSound.play();
  resetBtn.style.display = '';
  footer.innerHTML='';
  if (onGame == 1){
    footer.innerHTML = '';
    carrotNum.innerHTML = count;
    for (i=0 ; i<10; i++){
      onItems("img/carrot.png", "carrot");
      onItems("img/bug.png", "bug");
    }
  }
  else{
    onGame = 1;
    resetBtn.innerHTML = '<i class="fas fa-stop fa-2x"></i>'
    carrotNum.innerHTML = count;
    for (i=0 ; i<10; i++){
      onItems("img/carrot.png", "carrot");
      onItems("img/bug.png", "bug");
    }
  }
}

function lost(){
  footer.innerHTML += `<div class="result">
      <button class="replay" onclick="setGame(); onTimer();">
        <i class="fas fa-redo fa-2x"></i>
      </button>
      <div class="comment">
        YOU LOST 💩
      </div>
    </div>`;
  onGame = 0;
  resetBtn.style.display = 'none';
  clearInterval(intervalID);
  bgSound.pause();
  alertSound.play();
  clearInterval(intervalID);
}

function win(){
  footer.innerHTML += `<div class="result">
      <button class="replay" onclick="setGame(); onTimer();">
        <i class="fas fa-redo fa-2x"></i>
      </button>
      <div class="comment">
        YOU WIN 🎉
      </div>
    </div>`;
  onGame=0;
  resetBtn.style.display = 'none';
  clearInterval(intervalID);
  bgSound.pause();
  winSound.play();
  clearInterval(intervalID);
}

resetBtn.addEventListener('click', () => {setGame(); onTimer();});

document.addEventListener('click', e => {
    if (e.target.id === "bug" && onGame === 1){
      bugSound.play();
      lost();
    }
    else if (e.target.id === "carrot"){
      carrotSound.currentTime = 0;
      carrotSound.play();
      e.target.remove();
      count --;
      carrotNum.innerHTML = count;
      if (count === 0 && onGame === 1)
        win();
    }
  }
);

document.addEventListener('mouseover', e => {
  if (e.target.id === "bug" || e.target.id === "carrot"){
    e.target.style.filter = 'opacity(0.2) drop-shadow(0 0 0 black)';
    e.target.style.transform = 'scale(1.1)';
}});

document.addEventListener('mouseout', e => {
  if (e.target.id === "bug" || e.target.id === "carrot"){
    e.target.style.filter = '';
    e.target.style.transform = '';
  }
});
