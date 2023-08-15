
const MUSIC_ASSET_LOCATION = "assets/music";
const SOUND_ASSET_LOCATION = "assets/sound";
const IMAGE_ASSET_LOCATION = "assets/img";

const SEGMENTS = [
    {fillStyle : "#e64495", text : "R Lootbox"     ,sound:"good"},
    {fillStyle : "#128174", text : "1 Jade"        ,sound:"bad"},
    {fillStyle : "#ab37e8", text : "2 Medals"      ,sound:"good"},
    {fillStyle : "#ea2332", text : "10K Rubines"   ,sound:"verigut"},
    {fillStyle : "#767676", text : "Spin Again..." ,sound:"whoa"},
    {fillStyle : "#e64495", text : "SR Lootbox"    ,sound:"verigut"},
    {fillStyle : "#128174", text : "10K Jades"     ,sound:"good"},
    {fillStyle : "#ab37e8", text : "1 Background"  ,sound:"good"},
    {fillStyle : "#ea2332", text : "10K Rubines"   ,sound:"verigut"},
    {fillStyle : "#2b292e", text : "Steam Key"     ,sound:"jakpot"},
    {fillStyle : "#128174", text : "1 Jade"        ,sound:"bad"},
    {fillStyle : "#e64495", text : "UR Lootbox"    ,sound:"verigut"},
    {fillStyle : "#ab37e8", text : "3 Medals"      ,sound:"good"},
    {fillStyle : "#ea2332", text : "5K Rubines"    ,sound:"verigut"},
    {fillStyle : "#2055e5", text : "1 Sapphire"    ,sound:"verigut"},
    {fillStyle : "#128174", text : "1 000 Jades"   ,sound:"good"},
    {fillStyle : "#767676", text : "Spin Again..." ,sound:"whoa"},
    {fillStyle : "#ab37e8", text : "1 Sticker"     ,sound:"verigut"},
    {fillStyle : "#ea2332", text : "2 500 Rubines" ,sound:"good"},   
    {fillStyle : "#128174", text : "50K Jades"     ,sound:"verigut"},
    {fillStyle : "#e64495", text : "U Lootbox"     ,sound:"good"},
    {fillStyle : "#fd3067", text : "5x UR Lootbox" ,sound:"jakpot"},
    {fillStyle : "#ea2332", text : "1 Rubine"      ,sound:"bad"},
    
]

const TheWheel = new Winwheel({
    "numSegments"       : 23,        
    "outerRadius"       : 185,   
    "innerRadius"     : 60,      
    "drawText"          : true,      
    "textFontSize"      : 16,       
    "textOrientation"   : "horizontal",  
    "textDirection"     : "reversed",
    "textAlignment"     : "outer",
    "textMargin"        : 18,
    "textFontFamily"    : "Whitney HTF Medium",
    "textLineWidth"     : 0,
    "textFillStyle"     : "#fff0bb",
    "segments"     :  SEGMENTS,
    "animation" :  
    {
        "type"     : "spinToStop",
        "easing"   : "Power3.easeOut",
        "duration" : 18,    //60
        "spins"    : 15,   //35

        "callbackFinished" : winAnimation,
        "callbackSound"    : playSound,  
"soundTrigger"     : "segment"   
        
    }
});

const AUDIO = new Audio(SOUND_ASSET_LOCATION + "/tick.mp3");
function playSound() {
    //audio.pause();
    AUDIO.currentTime = 0;
    AUDIO.play();
}

const loadedImg = new Image();
loadedImg.onload = function () {
    TheWheel.wheelImage = loadedImg;
    TheWheel.draw();
}

loadedImg.src = IMAGE_ASSET_LOCATION + "/heart-icon.png"; // planespng?

let wheelPower = 4; //5
let wheelSpinning = false;

function powerSelected(powerLevel) {

    if (wheelSpinning == false) {

        wheelPower = powerLevel;

        document.getElementById("spin_button").src = IMAGE_ASSET_LOCATION + "/spin_on.png";
        document.getElementById("spin_button").className = "clickable";
    }
}


const winsound2 = document.getElementById("spin");
function startSpin() {
    resetWheel()
    //winsound2.src = ""
    let rand = Math.floor(Math.random() * 7 + 1);
    if (rand == 1) winsound2.src = MUSIC_ASSET_LOCATION + "/cccity.mp3"
    if (rand == 2) winsound2.src = MUSIC_ASSET_LOCATION + "/spin.mp3"
    if (rand == 3) winsound2.src = MUSIC_ASSET_LOCATION + "/yoshi.mp3"
    if (rand == 4) winsound2.src = MUSIC_ASSET_LOCATION + "/piao.mp3"
    if (rand == 5) winsound2.src = MUSIC_ASSET_LOCATION + "/ievan.mp3"
    if (rand == 6) winsound2.src = MUSIC_ASSET_LOCATION + "/spin.mp3"
    if (rand == 7) winsound2.src = MUSIC_ASSET_LOCATION + "/piao.mp3"

    //winsound2.src = " "
    winsound2.play();
    document.querySelector("#resultbox p").innerHTML = " - - SPINNING - - ";

    if (wheelSpinning == false) {
        TheWheel.startAnimation();
        wheelSpinning = true;
    }
}

function resetWheel() {
    TheWheel.stopAnimation(false);
    TheWheel.rotationAngle = 0;

    const winsound = document.getElementById("sound");
    const winsound2 = document.getElementById("spin");
    winsound2.src = "";
    winsound.src = "";

    for (x = 1; x < TheWheel.segments.length; x++) {
        TheWheel.segments[x].fillStyle = SEGMENTS[x - 1].fillStyle;
    }

    TheWheel.draw();
    wheelSpinning = false;
}


function winAnimation({sound,text}) {
    winsound2.pause();
    document.querySelector("#resultbox p").innerHTML = text;

    const winsound = document.getElementById("sound");
    winsound.src = SOUND_ASSET_LOCATION + "/" + sound + ".mp3";

    winsound.play();
    const winningSegmentNumber = TheWheel.getIndicatedSegmentNumber();
    for (x = 1; x < TheWheel.segments.length; x++) {
        TheWheel.segments[x].fillStyle = "#1c1c1c";
    }
    TheWheel.segments[winningSegmentNumber].fillStyle = "#b91421";
    TheWheel.draw();
}
