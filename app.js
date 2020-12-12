
// DATA
var count = 0
var clickAmount = 1


upgrades = {
    dogFood: { name: "Dog Food", cost: 500, id: "dog-food-upgrade", img: "dog-food-image.png", description: "Reduce dog cost multiplier" },
    sheepDog: { name: "Sheep Dog", cost: 50, id: "sheep-dog-upgrade", img: "sheep-dog-image.png", description: "Count 10 more sheep every click" },
    runningShoes: { name: "Running Shoes", cost: 300, id: "running-shoes-upgrade", img: "running-shoes.png", description: "Sheep are fast! Keeping up will help you count." }
}
sheepDogCostMultiplier = 1

function drawUpgradeCards() {
    let template = ''

    for (upgradeKey in upgrades) {

        template +=
            /*html*/
            `
            <div class="col-2 align-content-center upgrade-card">

                <div id="${upgrades[upgradeKey]['id']}" class="row align-self-center justify-content-center upgrade-image" style="background-image: url(${upgrades[upgradeKey]['img']})">
                    <div class="flex-column d-flex justify-content-end align-items-center">
                        <h4>Cost:${upgrades[upgradeKey]['cost']}</h4>
                        <button id="${upgrades[upgradeKey]['id']}-button" onclick = "${upgradeKey}()" type="button" class="mb-1">Buy ${upgrades[upgradeKey]['name']}</button>
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
    updateBuyCards()
}

function oneClick() {
    count += clickAmount
    updateCount()
}

function updateBuyCards() {
    for (item in upgrades) {
        cardId = upgrades[item]['id']
        let card = document.getElementById(cardId)
        let cardButtonId = cardId + '-button'


        let cardButton = document.getElementById(cardButtonId)
        console.log(cardButton);
        if (upgrades[item]['cost'] >= count) {
            card.classList.add("cannot-afford")
            cardButton.disabled = true
        } else {
            console.log('else reached');
            card.classList.remove("cannot-afford")
            card.button.disabled = false

        }
    }
    console.log('done');
}

function sheepDog() {
    count -= upgrades['sheepDog']['cost']
    updateCount()
    upgrades['sheepDog']['cost'] += Math.floor(upgrades['sheepDog']['cost'] * sheepDogCostMultiplier)
    clickAmount += 10


    document.getElementById("sheep-dog-upgrade-display").innerHTML = upgrades['sheepDog']['cost']
}

function dogFood() {
    if (sheepDogCostMultiplier >= .2) {
        sheepDogCostMultiplier -= .05
        count -= upgrades.dogFood.cost
        updateCount()

    }
}

drawUpgradeCards()
updateBuyCards()
