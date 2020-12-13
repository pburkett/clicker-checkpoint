
// DATA

var count = 0
var clickAmount = 1
var passiveGenerationAmount = 0


upgrades = {
    dogFood: { name: "Dog Food", cost: 500, id: "dog-food-upgrade", img: "dog-food-image.png", description: "Reduce dog cost multiplier", upgradeLevel: 0, availability: "disabled" },
    sheepDog: { name: "Sheep Dog", cost: 50, id: "sheep-dog-upgrade", img: "sheep-dog-image.png", description: "A friendly dog can count sheep themselves", upgradeLevel: 0, availability: "disabled" },
    runningShoes: { name: "Running Shoes", cost: 30, id: "running-shoes-upgrade", img: "running-shoes.png", description: "Sheep are fast! Shoes will help you count more per click", upgradeLevel: 0, availability: "disabled" },
    eyeGlasses: { name: "Counting Specs", cost: 500, id: "eye-glasses-upgrade", img: "glasses-image.png", description: "The better you see, the better you count!", upgradeLevel: 0, availability: "disabled" }
}
var sheepDogCostMultiplier = 1




function drawUpgradeCards() {

    let template = ''
    for (upgradeKey in upgrades) {
        if (upgrades[upgradeKey]['cost'] > count) {
            upgrades[upgradeKey]['availability'] = "disabled"
        } else {
            upgrades[upgradeKey]['availability'] = ""
        }
        template +=
            /*html*/
            `
            <div class="col align-content-center upgrade-card">

                <div id="${upgrades[upgradeKey]['id']}" class="${(upgrades[upgradeKey]['availability'] ? 'cannot-afford ' : '')}row align-self-center justify-content-center upgrade-image" style="background-image: url(${upgrades[upgradeKey]['img']})">
                    <div class="flex-column d-flex justify-content-end align-items-center">
                        
                        <button ${upgrades[upgradeKey]["availability"]} id="${upgrades[upgradeKey]['id']}-button" onclick="${upgradeKey}()" type="button" class="mb-1">Buy ${upgrades[upgradeKey]['name']}</button>
                        <h4>Cost:${upgrades[upgradeKey]['cost']}</h4>
                    </div>
                </div>
                <div class="row upgrade-description">
                    <h5 class="col text-center ">${upgrades[upgradeKey]['description']}</h5>
                </div>
                </div>
            `/*html*/
    }
    document.getElementById("upgrade-card-container").innerHTML = template
}


function updateCount() {
    document.getElementById("count-display").innerHTML = count
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
    updateCount()
    passiveGenerationAmount += 1
    upgrades['sheepDog']['cost'] += Math.floor(upgrades['sheepDog']['cost'] * sheepDogCostMultiplier)



}
function runningShoes() {
    upgrades['runningShoes']['upgradeLevel'] += 1
    count -= upgrades['runningShoes']['cost']
    updateCount()
    upgrades['runningShoes']['cost'] += Math.floor(upgrades['runningShoes']['cost'] * 1.2)
    clickAmount += 5
    drawUpgradeCards()
}

function dogFood() {

    if (sheepDogCostMultiplier >= .2) {
        upgrades['dogFood']['upgradeLevel'] += 1
        sheepDogCostMultiplier -= .05
        count -= upgrades.dogFood.cost
        updateCount()
    }
}

function eyeGlasses() {
    upgrades['eyeGlasses']['upgradeLevel'] += 1
    count -= upgrades['eyeGlasses']['cost']
    updateCount()
    clickAmount += 25

}

function incrementer() {
    count += passiveGenerationAmount
    updateCount()
}
drawUpgradeCards()
let increment = setInterval(() => incrementer(), 1000)




