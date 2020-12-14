
// DATA

var count = 0
var clickAmount = 1
var passiveGenerationAmount = 0
var incrementSpeed = 3000
var eyeGlassesIncreaseAmount = 50
upgrades = {
    dogFood: { name: "Dog Food", cost: 250, id: "dog-food-upgrade", img: "dog-food-image.png", description: "Help your dogs count faster", upgradeLevel: 0, maxLevel: 10, availability: "disabled" },
    sheepDog: { name: "Sheep Dog", cost: 50, id: "sheep-dog-upgrade", img: "sheep-dog-image.png", description: "A herding dog can count sheep themselves", upgradeLevel: 0, maxLevel: 100, availability: "disabled" },
    runningShoes: { name: "Running Shoes", cost: 30, id: "running-shoes-upgrade", img: "running-shoes.png", description: "Sheep are fast! Shoes will help you count more per click", upgradeLevel: 0, maxLevel: 12, availability: "disabled" }
}
lockedUpgrades = {
    eyeGlasses: { name: "Counting Specs", cost: 1000, id: "eye-glasses-upgrade", img: "glasses-image.png", description: "The better you see, the better you count!", upgradeLevel: 0, maxLevel: 8, availability: "disabled", unlocker: "runningShoes", unlockLevel: "10" },
    sheepSpeed: { name: "Sheep Speed", cost: 500, id: "sheep-speed-upgrade", img: "sheep-speed-image.png", description: "If the sheep are faster, everything is faster", upgradeLevel: 0, maxLevel: 3, availability: "disabled", unlocker: "dogFood", unlockLevel: "8" }
}

var sheepDogCostMultiplier = 1




function drawUpgradeCards() {
    unlockUpgrades()
    let template = ''
    for (upgradeKey in upgrades) {
        let maxedCSSApplicator = ''
        if (upgrades[upgradeKey]['cost'] > count) {
            upgrades[upgradeKey]['availability'] = "disabled"
        } else {
            upgrades[upgradeKey]['availability'] = ""
        }
        if (upgrades[upgradeKey]['upgradeLevel'] >= upgrades[upgradeKey]['maxLevel']) {
            maxedCSSApplicator = 'maxed-upgrade'
            upgrades[upgradeKey]['description'] = "Max Level"
            upgrades[upgradeKey]['cost'] = ""
            upgrades[upgradeKey]['name'] = ""
            upgrades[upgradeKey]['availability'] = "disabled"
        }

        template +=
            /*html*/
            `
            <div class="col upgrade-card mb-2">

                <div id="${upgrades[upgradeKey]['id']}" class="${(upgrades[upgradeKey]['availability'] ? 'cannot-afford ' : '')}row align-self-center justify-content-center upgrade-image  card-shadow" 
                    style="background-image: url(${upgrades[upgradeKey]['img']})">
                    <div  class="col upgrade-description-container ${maxedCSSApplicator}" id="upgrade-description-container-${upgrades[upgradeKey]['id']}">
                        <h2 class="text-center upgrade-description-header default-cursor">${upgrades[upgradeKey]['name']}</h2>
                        <p class="text-center upgrade-description default-cursor">${upgrades[upgradeKey]['description']}</p>
                        <h3 class="text-center text-shadow">${upgrades[upgradeKey]['cost']}</h3>
                    </div>
                    <div class="flex-column justify-self-center d-flex justify-content-end align-items-center default-cursor">

                    </div>
                </div>
                <div class="d-flex flex-direction-column w-100 align-items-center mt-2">
                    <button ${upgrades[upgradeKey]["availability"]} id="${upgrades[upgradeKey]['id']}-button" onclick="${upgradeKey}()" type="button" class="mb-1 card-shadow upgrade-button align-self-center">Buy</button>
                </div>
                <div class="row upgrade-description">
                    
                </div>
                </div>
            `/*html*/
    }
    document.getElementById("upgrade-card-container").innerHTML = template
}


function updateCount() {
    document.getElementById("count-display").innerHTML = count + ' Sheep'
    drawUpgradeCards()
}

function oneClick() {
    count += clickAmount
    updateCount()
}

function sheepDog() {
    upgrades['sheepDog']['upgradeLevel'] += 1
    console.log(upgrades['sheepDog']['upgradeLevel']);
    count -= upgrades['sheepDog']['cost']
    passiveGenerationAmount += 1
    upgrades['sheepDog']['cost'] += Math.floor(upgrades['sheepDog']['cost'] * sheepDogCostMultiplier)
    updateCount()
}
function runningShoes() {
    upgrades['runningShoes']['upgradeLevel'] += 1
    count -= upgrades['runningShoes']['cost']
    updateCount()
    upgrades['runningShoes']['cost'] += Math.floor(upgrades['runningShoes']['cost'] * 1.2)
    clickAmount += 5

}

function dogFood() {
    upgrades['dogFood']['cost'] += Math.floor(upgrades['dogFood']['cost'] * .5)
    upgrades['dogFood']['upgradeLevel'] += 1
    count -= upgrades.dogFood.cost
    updateCount()

}

function eyeGlasses() {
    upgrades['eyeGlasses']['upgradeLevel'] += 1
    count -= upgrades['eyeGlasses']['cost']
    clickAmount += eyeGlassesIncreaseAmount
    eyeGlassesIncreaseAmount += eyeGlassesIncreaseAmount * 1
    upgrades['eyeGlasses']['cost'] += Math.floor(upgrades['eyeGlasses']['cost'] * 2)
    updateCount()
}

function sheepSpeed() {
    upgrades['sheepSpeed']['upgradeLevel'] += 1
    count -= upgrades['sheepSpeed']['cost']
    updateCount()
    incrementSpeed -= 500
    let increment = setInterval(() => incrementer(), incrementSpeed)
    upgrades['sheepSpeed']['cost'] += Math.floor(upgrades['sheepSpeed']['cost'] * 2)
}

function incrementer() {
    let sheepDogMultiplier = 1

    console.log(upgrades['dogFood']['upgradeLevel']);
    sheepDogMultiplier += upgrades['dogFood']['upgradeLevel']

    let passiveGenerationAmount = upgrades['sheepDog']['upgradeLevel'] * sheepDogMultiplier
    count += passiveGenerationAmount
    updateCount()
    if (passiveGenerationAmount > 0) {
        document.getElementById("sheep-img").classList.add("sheep-img-scale")
        setTimeout(() => {
            document.getElementById("sheep-img").classList.remove("sheep-img-scale")
        }, 100);
    }
}

function unlockUpgrades() {

    for (lockedUpgradeKey in lockedUpgrades) {
        let lockedUpgrade = lockedUpgrades[lockedUpgradeKey]
        let lockedUpgradeUnlocker = lockedUpgrade['unlocker']

        if (upgrades[lockedUpgradeUnlocker]['upgradeLevel'] >= lockedUpgrade['unlockLevel']) {
            upgrades[lockedUpgradeKey] = lockedUpgrade
            delete lockedUpgrades[lockedUpgradeKey]


        }

    }
}

function maxedUpgrade(upgradeKey) {
    console.log(upgradeKey);
    console.log(upgrades[upgradeKey]);
    id = `upgrade-description-container-${upgrades[upgradeKey]['id']}`
    console.log(id);
    document.getElementById('id').innerHTML =
        '<img src="https://img2.pngio.com/black-x-png-7-png-image-black-x-png-1600_1600.png"></img>'
}
drawUpgradeCards()

let increment = setInterval(() => incrementer(), incrementSpeed)

function goFullScreen() {
    document.getElementById("immersive-mode-display").classList.add("display-none")
    document.documentElement.requestFullscreen().catch((e) => {
        console.log(e);
    })
}




