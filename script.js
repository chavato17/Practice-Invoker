let startpracticeButton = document.getElementById('start-practice');
let restartbtn = document.getElementById("restart-btn");
let practiceAgainBtn = document.getElementById("practice-again");
const clockDisplay = document.getElementById('clock-display');

let ms = 0, seconds = 0, minutes = 0, hours = 0;
let timerRef = null;
let isRunning = false;

//********* STOPWATCH *********//
function stopwatchLogic() {
    ms++;

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

    let pMs = ms < 10 ? `0${ms}` : ms;

    if (hours > 0) {
        let m = minutes < 10 ? `0${minutes}` : minutes;
        let s = seconds < 10 ? `0${seconds}` : seconds;

        clockDisplay.textContent = `${hours}:${m}:${s}.${pMs}`;
    }
    else if (minutes > 0) {
        let s = seconds < 10 ? `0${seconds}` : seconds;

        clockDisplay.textContent = `${minutes}:${s}.${pMs}`;
    }
    else {
        clockDisplay.textContent = `${seconds}.${pMs}`;
    }
}

let orb1 = document.getElementById('Orb1');
let orb2 = document.getElementById('Orb2');
let orb3 = document.getElementById('Orb3');
let spell1 = document.getElementById('spell1');
let spell2 = document.getElementById('spell2');

let modespell = document.getElementById('mode-spell');
let badge = document.getElementById("badge");
let badgespan = document.getElementById("badge-span");
let badgeP = document.getElementById("badgeP");
let finalTimeDisplay = document.getElementById("final-time-display");
let timenumber = document.getElementById("timenumber");
let timeletter = document.getElementById("timeletter");

let quaskeybtn = document.getElementById('quaskeybtn');
let wexkeybtn = document.getElementById('wexkeybtn');
let exortkeybtn = document.getElementById('exortkeybtn');
let invokekeybtn = document.getElementById('invokekeybtn');
let resetkeybinds = document.getElementById('reset-keybinds');

let orbcontainer = document.getElementById('orb-container');
let invokerspellscontainer = document.getElementById('invoker-spells');

let spellCount = document.getElementById("spell-count");
let spellCountDisplay = document.getElementById("spell-countdisplay");
let spellDescription = document.getElementById("spell-description");

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


//***** Orb and Spell ARRAY DATA ******//

let spells = [];
let orbs = [];

//************* IMAGES ***************//

    let quas = 'orbs/quas.jpg';
    let wex = 'orbs/wex.jpg';
    let exort = 'orbs/exort.jpg';

    let nospell = 'spells/no-spell.webp';
    let noorb = 'orbs/no-orb.webp'

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

    let bronzebadge = 'badge/bronze.webp';
    let silverbadge = 'badge/silver.webp';
    let goldbadge = 'badge/gold.webp';
    let platinumbadge = 'badge/platinum.webp';
    let masterbadge = 'badge/master.webp';
    let grandmasterbadge = 'badge/grandmaster.webp' ;

// ENTER to START & RESTART

document.addEventListener("keydown", (event) => {

    if (modal.classList.contains("modal-show")) {
        return;
    }

    if (event.key === "Enter") {

        if (classicModeFinished) {
            practiceAgainBtn.click();
            return;
        }

        if (!isRunning) {
            startpracticeButton.click();
        }
        else {
            restartbtn.click();
        }
    }
});


//MAIN MENU INTERFACE **************
function mainmenu(){
    
    isRunning = false;

    classicModeFinished = false;


    restartbtn.classList.remove("show");
    restartbtn.classList.add("hide");
    startpracticeButton.classList.remove("hide");
    startpracticeButton.classList.add("show");
    practiceAgainBtn.classList.remove("show");
    practiceAgainBtn.classList.add("hide");
    

    startpracticeButton.removeEventListener('click', () => {})

    // Reset the stopwatch
    clockDisplay.classList.remove("show");
    clockDisplay.classList.add("hide");

    spellCountDisplay.classList.add("hide")
    spellDescription.classList.add("hide")
    orbcontainer.classList.remove("hide")
    invokerspellscontainer.classList.remove("hide")

    clearInterval(timerRef);
    timerRef = null;
    ms = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    clockDisplay.textContent = "00:00:00.00";

    // Reset orb array
    orbs = [];
    spells = [];

    // Reset orb images
    orb1.src = noorb;
    orb2.src = noorb;
    orb3.src = noorb;

    // Reset spell image
    spell1.src = nospell;
    spell2.src = nospell; 

    modespell.src = "";
    modespell.classList.add("hide");
}

//ACTIVE INTERFACE **************
function active() {
    isRunning = true;
    
    classicmode();

    clockDisplay.classList.remove("hide");
    clockDisplay.classList.add("show");

    spellCountDisplay.classList.remove("hide")
    spellDescription.classList.remove("hide")

    startpracticeButton.classList.add("hide");

    restartbtn.classList.remove("hide");
    restartbtn.classList.add("show");

    if (timerRef === null) {
        timerRef = setInterval(stopwatchLogic, 10);
    }
}

//FINISHED INTERFACE **************
function finished(){

    classicCurrentSpell = null;
    modespell.src = "";

    modespell.classList.add('hide')
    spellCountDisplay.classList.add("hide")
    spellDescription.classList.add("hide")
    
    orbcontainer.classList.add("hide")
    invokerspellscontainer.classList.add("hide")

    restartbtn.classList.remove("show");
    restartbtn.classList.add("hide");
    practiceAgainBtn.classList.remove("hide");
    practiceAgainBtn.classList.add("show");

    badgeP.classList.remove("hide");
    badgeP.classList.add("show");
    badge.classList.remove("hide");
    badge.classList.add("show");
    badgespan.classList.remove("hide");
    badgespan.classList.add("show");
    finalTimeDisplay.classList.remove("hide");
    finalTimeDisplay.classList.add("show");

    clockDisplay.classList.remove("show");
    clockDisplay.classList.add("hide");

    timenumber.textContent = clockDisplay.textContent;

    if (hours > 0) {
        timeletter.textContent = "h";
    }
    else if (minutes > 0) {
        timeletter.textContent = "m";
    }
    else {
        timeletter.textContent = "s";
    }
}


//**************************************** START BTN ****************************************//

startpracticeButton.addEventListener('click', () => {
    startpracticeButton.classList.add("hide");
    startpracticeButton.classList.remove("show");
    active();
});

//************************************* PRACTICE AGAIN BTN *************************************//

practiceAgainBtn.addEventListener("click", () => {
    practiceAgainBtn.classList.add("hide");
    practiceAgainBtn.classList.remove("show");
    badgeP.classList.remove("show");
    badgeP.classList.add("hide");
    badge.classList.remove("show");
    badge.classList.add("hide");
    badgespan.classList.remove("show");
    badgespan.classList.add("hide");
    finalTimeDisplay.classList.add("hide");
    finalTimeDisplay.classList.remove("show");
    mainmenu();
});


//**************************************** RESTART BTN ****************************************//

restartbtn.addEventListener('click', () => {
    restartbtn.classList.add("hide");
    restartbtn.classList.remove("show");
    mainmenu();
});

//************************************* ORBS & SPELL LOGIC *************************************//

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

            if (key === quaskeybind) {
                orbs.push('Q');
            }
            else if (key === wexkeybind) {
                orbs.push('W');
            }
            else if (key === exortkeybind) {
                orbs.push('E');
            }

            // Update orb images
            if (orbs[0] === 'Q') orb1.src = quas;
            if (orbs[0] === 'W') orb1.src = wex;
            if (orbs[0] === 'E') orb1.src = exort;

            if (orbs[1] === 'Q') orb2.src = quas;
            if (orbs[1] === 'W') orb2.src = wex;
            if (orbs[1] === 'E') orb2.src = exort;

            if (orbs[2] === 'Q') orb3.src = quas;
            if (orbs[2] === 'W') orb3.src = wex;
            if (orbs[2] === 'E') orb3.src = exort;
        }

        
        //Invoke
        let combovalue = 0;
        
        if (key === invokekeybind && orbs.length === 3) {

            let combo = [...orbs].sort().join('');
            
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
            console.log(orbs)
            spell1.src = spells[0] || nospell;
            spell2.src = spells[1] || nospell;
            classicCheckSpell(combovalue);
        }   

});

quaskeybtn.addEventListener('click', () => {
    clearInterval(timerRef);
    timerRef = null;
    modal.classList.add('modal-show');

    modalspell.textContent = "Quas";
    modalspell.style.color = "#1f8fff";
    modalimg.src = quas;

    selectedKeybind = "quas";
});

wexkeybtn.addEventListener('click', () => {
    clearInterval(timerRef);
    timerRef = null;
    modal.classList.add('modal-show');

    modalspell.textContent = "Wex";
    modalspell.style.color = "#c05cff";
    modalimg.src = wex;

    selectedKeybind = "wex";
});

exortkeybtn.addEventListener('click', () => {
    clearInterval(timerRef);
    timerRef = null;
    modal.classList.add('modal-show');

    modalspell.textContent = "Exort";
    modalspell.style.color = "#f19345";
    modalimg.src = exort;

    selectedKeybind = "exort";
});

invokekeybtn.addEventListener('click', () => {
    clearInterval(timerRef);
    timerRef = null;
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

    if (event.key === "Enter") {
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

    event.preventDefault();
    closeModal();
});

function closeModal() {

    if (isRunning && timerRef === null) {
        timerRef = setInterval(stopwatchLogic, 10);
    }

    modal.classList.remove('modal-show');
    document.activeElement.blur();
}


//******************************************* MODES *******************************************//

//**************//
// CLASSIC MODE //
//**************//

let classicSpells = [
    coldsnap,
    ghostwalk,
    icewall,
    emp,
    tornado,
    alacrity,
    sunstrike,
    forgespirit,
    chaosmeteor,
    deafeningblast
];

let classicSpellNames = {
[coldsnap]: "Cold Snap",
[ghostwalk]: "Ghost Walk",
[icewall]: "Ice Wall",
[emp]: "EMP",
[tornado]: "Tornado",
[alacrity]: "Alacrity",
[sunstrike]: "Sun Strike",
[forgespirit]: "Forge Spirit",
[chaosmeteor]: "Chaos Meteor",
[deafeningblast]: "Deafening Blast"
};

let classicIndex = 0;
let classicCurrentSpell = null;
let classicModeFinished = false;
let classicModeActive = false;

function classicmode() {

    classicModeActive = true;
    classicModeFinished = false;

    ms = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;

    clockDisplay.textContent = "0.00";

    if (timerRef === null) {
        timerRef = setInterval(stopwatchLogic, 10);
    }

    classicSpells = [
        coldsnap,
        ghostwalk,
        icewall,
        emp,
        tornado,
        alacrity,
        sunstrike,
        forgespirit,
        chaosmeteor,
        deafeningblast
    ];

    classicSpells.sort(() => Math.random() - 0.5);

    classicIndex = 0;

    classicNextSpell();
}


function classicNextSpell() {

    if (classicIndex >= classicSpells.length) {
        classicFinished();
        return;
    }

    classicCurrentSpell = classicSpells[classicIndex];

    modespell.src = classicCurrentSpell;

    spellDescription.textContent = classicSpellNames[classicCurrentSpell];

    modespell.classList.remove("hide");
    spellDescription.classList.remove("hide");

    spellCount.textContent = classicIndex + 1;
}


function classicCheckSpell(invokedSpell) {

    if (!classicModeActive) {
        return;
    }

    if (invokedSpell === classicCurrentSpell) {

        classicIndex++;

        classicNextSpell();
    }
}


function classicFinished() {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds + ms / 100;

    isRunning = false;
    classicModeActive = false;
    classicModeFinished = true;

    clearInterval(timerRef);
    timerRef = null;

    if (totalSeconds < 6) {
        badge.src = grandmasterbadge;
        badgespan.textContent = "Grandmaster";
        badgespan.style.color = "#BA200D";
    }
    else if (totalSeconds < 8) {
        badge.src = masterbadge;
        badgespan.textContent = "Master";
        badgespan.style.color = "#8C5BA9";
    }
    else if (totalSeconds < 12) {
        badge.src = platinumbadge;
        badgespan.textContent = "Platinum";
        badgespan.style.color = "#4E6BE1";
    }
    else if (totalSeconds < 15) {
        badge.src = goldbadge;
        badgespan.textContent = "Gold";
        badgespan.style.color = "#ECD75C";
    }
    else if (totalSeconds < 20) {
        badge.src = silverbadge;
        badgespan.textContent = "Silver";
        badgespan.style.color = "#B4E1E6";
    }
    else {
        badge.src = bronzebadge;
        badgespan.textContent = "Bronze";
        badgespan.style.color = "#AA632E";
    }

    finished();
}