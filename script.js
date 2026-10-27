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

let quaskeybtn = document.getElementById('quaskeybtn');
let wexkeybtn = document.getElementById('wexkeybtn');
let exortkeybtn = document.getElementById('exortkeybtn');
let invokekeybtn = document.getElementById('invokekeybtn');
let resetkeybinds = document.getElementById('reset-keybinds');


let selectedKeybind = null;
let quaskeybind = 'Q';
let wexkeybind = 'W';
let exortkeybind = 'E';
let invokekeybind = 'R';

updateKeyButton(quaskeybtn, quaskeybind);
updateKeyButton(wexkeybtn, wexkeybind);
updateKeyButton(exortkeybtn, exortkeybind);
updateKeyButton(invokekeybtn, invokekeybind);


function updateKeyButton(button, key) {
    button.textContent = key;

    if (key.length >= 4) {
        button.style.fontSize = "10px";
    } 
    else {
        button.style.fontSize = "14px";
    }
}

let spellSpans = {
    coldsnap: document.getElementById('coldsnap-span'),
    ghostwalk: document.getElementById('ghostwalk-span'),
    icewall: document.getElementById('icewall-span'),
    emp: document.getElementById('emp-span'),
    tornado: document.getElementById('tornado-span'),
    alacrity: document.getElementById('alacrity-span'),
    sunstrike: document.getElementById('sunstrike-span'),
    forgespirit: document.getElementById('forgespirit-span'),
    chaosmeteor: document.getElementById('chaosmeteor-span'),
    deafeningblast: document.getElementById('deafeningblast-span')
};

function updateSpellKeybinds() {
    spellSpans.coldsnap.textContent = `${quaskeybind}${quaskeybind}${quaskeybind}`;
    spellSpans.ghostwalk.textContent = `${quaskeybind}${quaskeybind}${wexkeybind}`;
    spellSpans.icewall.textContent = `${quaskeybind}${quaskeybind}${exortkeybind}`;
    spellSpans.emp.textContent = `${wexkeybind}${wexkeybind}${wexkeybind}`;
    spellSpans.tornado.textContent = `${wexkeybind}${wexkeybind}${quaskeybind}`;
    spellSpans.alacrity.textContent = `${wexkeybind}${wexkeybind}${exortkeybind}`;
    spellSpans.sunstrike.textContent = `${exortkeybind}${exortkeybind}${exortkeybind}`;
    spellSpans.forgespirit.textContent = `${exortkeybind}${exortkeybind}${quaskeybind}`;
    spellSpans.chaosmeteor.textContent = `${exortkeybind}${exortkeybind}${wexkeybind}`;
    spellSpans.deafeningblast.textContent = `${quaskeybind}${wexkeybind}${exortkeybind}`;
}

updateSpellKeybinds();


let modal = document.getElementById('modal');
let modalcontent = document.getElementById('modal-content');
let modalspell = document.getElementById('modalspell');
let modalimg = document.getElementById('modal-img');


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

        if (!isRunning || modal.classList.contains('modal-show')) {
            return;
        }

        let key = event.key.toUpperCase();

        // Quas, Wex, Exort = add orb
        if (key === quaskeybind || key === wexkeybind || key === exortkeybind) {

            if (orbs.length >= 3) {
                orbs.shift();
            }

            orbs.push(key);

            // Update orb images
            if (orbs[0] === quaskeybind) orb1.src = quas;
            if (orbs[0] === wexkeybind) orb1.src = wex;
            if (orbs[0] === exortkeybind) orb1.src = exort;

            if (orbs[1] === quaskeybind) orb2.src = quas;
            if (orbs[1] === wexkeybind) orb2.src = wex;
            if (orbs[1] === exortkeybind) orb2.src = exort;

            if (orbs[2] === quaskeybind) orb3.src = quas;
            if (orbs[2] === wexkeybind) orb3.src = wex;
            if (orbs[2] === exortkeybind) orb3.src = exort;
        }

        
        //Invoke
        let combovalue = 0;
        
        if (key === invokekeybind && orbs.length === 3) {

            let combo = orbs.map(orb => {
                if (orb === quaskeybind) return 'Q';
                if (orb === wexkeybind) return 'W';
                if (orb === exortkeybind) return 'E';
            }).sort().join('');
            
            if (combo === 'QQQ') {
                combovalue = coldsnap; // Cold Snap
            }
            else if (combo === 'QQW' || combo === 'WQQ' || combo === 'QWQ') {
                combovalue = ghostwalk; // Ghost Walk
            }
            else if (combo === 'QQE' || combo === 'EQQ' || combo === 'QEQ') {
                combovalue = icewall; // Ice Wall
            }
            else if (combo === 'WWW') {
                combovalue = emp; // EMP
            }
            else if (combo === 'QWW' || combo === 'WWQ' || combo === 'WQW') {
                combovalue = tornado; // Tornado
            }
            else if (combo === 'WWE' || combo === 'EWW' || combo === 'WEW') {
                combovalue = alacrity; // Alacrity
            }
            else if (combo === 'EEE') {
                combovalue = sunstrike; // Sun Strike
            }
            else if (combo === 'QEE' || combo === 'EQE' || combo === 'EEQ') {
                combovalue = forgespirit; // Forge Spirit
            }
            else if (combo === 'EEW' || combo === 'EWE' || combo === 'WEE') {
                combovalue = chaosmeteor; // Chaos Meteor
            }
            else if (combo === 'EQW' || combo === 'WQE' || combo === 'QEW') {
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

quaskeybtn.addEventListener('click', () => {
    modal.classList.add('modal-show');

    modalspell.textContent = "Quas";
    modalspell.style.color = "#1f8fff";
    modalimg.src = quas;

    selectedKeybind = "quas";
});

wexkeybtn.addEventListener('click', () => {
    modal.classList.add('modal-show');

    modalspell.textContent = "Wex";
    modalspell.style.color = "#c05cff";
    modalimg.src = wex;

    selectedKeybind = "wex";
});

exortkeybtn.addEventListener('click', () => {
    modal.classList.add('modal-show');

    modalspell.textContent = "Exort";
    modalspell.style.color = "#f19345";
    modalimg.src = exort;

    selectedKeybind = "exort";
});

invokekeybtn.addEventListener('click', () => {
    modal.classList.add('modal-show');

    modalspell.textContent = "Invoke";
    modalspell.style.color = "#f1e645";
    modalimg.src = 'orbs/invoke.webp';

    selectedKeybind = "invoke";
});

resetkeybinds.addEventListener('click', () =>{
    quaskeybind = "Q";
    wexkeybind = "W";
    exortkeybind = "E";
    invokekeybind = "R";

    updateKeyButton(quaskeybtn, quaskeybind);
    updateKeyButton(wexkeybtn, wexkeybind);
    updateKeyButton(exortkeybtn, exortkeybind);
    updateKeyButton(invokekeybtn, invokekeybind);
    updateSpellKeybinds();
});

document.addEventListener('keydown', (event) => {

    if (!modal.classList.contains('modal-show')) {
        return;
    }

    let newKey = event.key.toUpperCase();

    if (selectedKeybind === "quas") {
        quaskeybind = newKey;
        updateKeyButton(quaskeybtn, newKey);
        updateSpellKeybinds();
    }

    if (selectedKeybind === "wex") {
        wexkeybind = newKey;
        updateKeyButton(wexkeybtn, newKey);
        updateSpellKeybinds();
    }

    if (selectedKeybind === "exort") {
        exortkeybind = newKey;
        updateKeyButton(exortkeybtn, newKey);
        updateSpellKeybinds();
    }

    if (selectedKeybind === "invoke") {
        invokekeybind = newKey;
        updateKeyButton(invokekeybtn, newKey);
        updateSpellKeybinds();
    }

    closeModal();
});

function closeModal() {
    modal.classList.remove('modal-show');
}




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