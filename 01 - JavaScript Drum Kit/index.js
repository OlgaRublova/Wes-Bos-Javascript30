const keys = document.querySelectorAll('.key');

//AddEventListeners
window.addEventListener('keydown', playMusic);
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

//Functions
function playMusic(e) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

        //stops the function from running
        if (!audio) return;

        //rewind to the start
        audio.currentTime = 0;

        audio.play();
        key.classList.add('playing');
}
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}