let startpracticeButton = document.getElementById('start-practice');
let restartbtn = document.getElementById("restart-btn");

const clockDisplay = document.getElementById('clock-display');


let ms = 0, seconds = 0, minutes = 0, hours = 0;
let timerRef = null;
let isRunning = false;

function stopwatchLogic() {
    ms++; // Increment milliseconds

    if (ms >= 100) {
            ms = 0;
            seconds++;
        if (seconds === 60) {
                seconds = 0;
                minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    // Pad numbers to ensure double digits
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let pMs = ms < 10 ? "0" + ms : ms;

    clockDisplay.textContent = `${h}:${m}:${s}.${pMs}`;
}

let orb1 = document.getElementById('Orb1');
let orb2 = document.getElementById('Orb2');
let orb3 = document.getElementById('Orb3');
let spell1 = document.getElementById('spell1');
let spell2 = document.getElementById('spell2');

//***** DATA STRUCTURING ******//

let spells = [];
let orbs = [];

//********** IMAGES ************//

    let quas = 'orbs/quas.jpg';
    let wex = 'orbs/wex.jpg';
    let exort = 'orbs/exort.jpg';

    let nospell = 'spells/no-spell.webp';

    let coldsnap = 'spells/cold-snap.webp';
    let ghostwalk = 'spells/ghost-walk.webp';
    let icewall = 'spells/ice-wall.webp';
    let emp = 'spells/emp.webp';
    let tornado = 'spells/tornado.webp';
    let alacrity = 'spells/alacrity.webp';
    let sunstrike = 'spells/sun-strike.webp';
    let forgespirit = 'spells/forge-spirit.webp';
    let chaosmeteor = 'spells/chaos-meteor.webp';
    let deafeningblast = 'spells/deafening-blast.webp';

startpracticeButton.addEventListener('click', () => {
    isRunning = true;
    clockDisplay.classList.remove("clock-hide");
    clockDisplay.classList.add("clock-show");

    startpracticeButton.classList.add("remove-startprac");
    restartbtn.classList.remove("restart-hide");
    restartbtn.classList.add("restart-show");

    if (timerRef === null) {
        timerRef = setInterval(stopwatchLogic, 10);
    }
});

document.addEventListener('keydown', (event) => {

        if(!isRunning) {return;}

        let key = event.key.toLowerCase();

        // Q, W, E = add orb
        if (key === 'q' || key === 'w' || key === 'e') {

            if (orbs.length >= 3) {
                orbs.shift();
            }

            orbs.push(key);

            console.log(orbs);

            // Update orb images
            if (orbs[0] === 'q') orb1.src = quas;
            if (orbs[0] === 'w') orb1.src = wex;
            if (orbs[0] === 'e') orb1.src = exort;

            if (orbs[1] === 'q') orb2.src = quas;
            if (orbs[1] === 'w') orb2.src = wex;
            if (orbs[1] === 'e') orb2.src = exort;

            if (orbs[2] === 'q') orb3.src = quas;
            if (orbs[2] === 'w') orb3.src = wex;
            if (orbs[2] === 'e') orb3.src = exort;
        }

        
        // R = Invoke
        let combovalue = 0;
        
        if (key === 'r' && orbs.length === 3) {

            let combo = [...orbs].sort().join('');
            
            if (combo === 'qqq') {
                combovalue = coldsnap; // Cold Snap
            }
            else if (combo === 'qqw' || combo === 'wqq' || combo === 'qwq') {
                combovalue = ghostwalk; // Ghost Walk
            }
            else if (combo === 'qqe' || combo === 'eqq' || combo === 'qeq') {
                combovalue = icewall; // Ice Wall
            }
            else if (combo === 'www') {
                combovalue = emp; // EMP
            }
            else if (combo === 'qww' || combo === 'wwq' || combo === 'wqw') {
                combovalue = tornado; // Tornado
            }
            else if (combo === 'wwe' || combo === 'eww' || combo === 'wew') {
                combovalue = alacrity; // Alacrity
            }
            else if (combo === 'eee') {
                combovalue = sunstrike; // Sun Strike
            }
            else if (combo === 'qee' || combo === 'eqe' || combo === 'eeq') {
                combovalue = forgespirit; // Forge Spirit
            }
            else if (combo === 'eew' || combo === 'ewe' || combo === 'wee') {
                combovalue = chaosmeteor; // Chaos Meteor
            }
            else if (combo === 'eqw' || combo === 'wqe' || combo === 'qew') {
                combovalue = deafeningblast; // Deafening Blast
            }

            if (spells[0] !== combovalue) {
                spells.unshift(combovalue);

                if (spells.length > 2) {
                    spells.pop();
                }
            }

            spell1.src = spells[0] || nospell;
            spell2.src = spells[1] || nospell;
        }   

});


restartbtn.addEventListener('click', () => {

    isRunning = false;
    restartbtn.classList.remove("restart-show");
    restartbtn.classList.add("restart-hide");
    startpracticeButton.classList.remove("remove-startprac");

    startpracticeButton.removeEventListener('click', () => {})

    // Reset the stopwatch

    clockDisplay.classList.remove("clock-show");
    clockDisplay.classList.add("clock-hide");

    clearInterval(timerRef);
    timerRef = null;
    ms = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    clockDisplay.textContent = "00:00:00.00";

    // Reset orb array
    orbs = [];

    // Reset orb images
    orb1.src = nospell;
    orb2.src = nospell;
    orb3.src = nospell;

    // Reset spell image
    spell1.src = nospell;
    spell2.src = nospell; 
    
    spells = [];
});