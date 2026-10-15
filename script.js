let startpracticeButton = document.getElementById('start-practice');
let restartbtn = document.getElementById("restart-btn");

const clockDisplay = document.getElementById('clock-display');


let ms = 0, seconds = 0, minutes = 0, hours = 0;
let timerRef = null;

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

let orbs = [];

let orbpics = [
    'orbs/quas.jpg',
    'orbs/wex.jpg',
    'orbs/exort.jpg'
];

let spellpics = [
    'spells/cold-snap.webp',
    'spells/ghost-walk.webp',
    'spells/ice-wall.webp',
    'spells/emp.webp',
    'spells/tornado.webp',
    'spells/alacrity.webp',
    'spells/sun-strike.webp',
    'spells/forge-spirit.webp',
    'spells/chaos-meteor.webp',
    'spells/deafening-blast.webp'
]

startpracticeButton.addEventListener('click', () => {

    startpracticeButton.classList.add("remove-startprac");
    restartbtn.classList.add("restart-show");

    if (timerRef === null) {
        timerRef = setInterval(stopwatchLogic, 10);
    }

    document.addEventListener('keydown', (event) => {

        let key = event.key.toLowerCase();

        // Q, W, E = add orb
        if (key === 'q' || key === 'w' || key === 'e') {

            if (orbs.length >= 3) {
                orbs.shift();
            }

            orbs.push(key);

            console.log(orbs);

            // Update orb images
            if (orbs[0] === 'q') orb1.src = orbpics[0];
            if (orbs[0] === 'w') orb1.src = orbpics[1];
            if (orbs[0] === 'e') orb1.src = orbpics[2];

            if (orbs[1] === 'q') orb2.src = orbpics[0];
            if (orbs[1] === 'w') orb2.src = orbpics[1];
            if (orbs[1] === 'e') orb2.src = orbpics[2];

            if (orbs[2] === 'q') orb3.src = orbpics[0];
            if (orbs[2] === 'w') orb3.src = orbpics[1];
            if (orbs[2] === 'e') orb3.src = orbpics[2];
        }


        // R = Invoke
        if (key === 'r' && orbs.length === 3) {

            let combo = [...orbs].sort().join('');

            if (combo === 'qqq') {
                spell1.src = spellpics[0]; // Cold Snap
            }
            else if (combo === 'qqw' || combo === 'wqq' || combo === 'qwq') {
                spell1.src = spellpics[1]; // Ghost Walk
            }
            else if (combo === 'qqe' || combo === 'eqq' || combo === 'qeq') {
                spell1.src = spellpics[2]; // Ice Wall
            }
            else if (combo === 'www') {
                spell1.src = spellpics[3]; // EMP
            }
            else if (combo === 'qww' || combo === 'wwq' || combo === 'wqw') {
                spell1.src = spellpics[4]; // Tornado
            }
            else if (combo === 'wwe' || combo === 'eww' || combo === 'wee') {
                spell1.src = spellpics[5]; // Alacrity
            }
            else if (combo === 'eee') {
                spell1.src = spellpics[6]; // Sun Strike
            }
            else if (combo === 'qee' || combo === 'eqe' || combo === 'eeq') {
                spell1.src = spellpics[7]; // Forge Spirit
            }
            else if (combo === 'eew' || combo === 'ewe' || combo === 'wee') {
                spell1.src = spellpics[8]; // Chaos Meteor
            }
            else if (combo === 'eqw' || combo === 'wqe' || combo === 'qew') {
                spell1.src = spellpics[9]; // Deafening Blast
            }
        }   

    });
});
