var auto = {};

/** Start/Sopt all auto functions
 **/
auto.on = function () {
    auto.startClicking();
    auto.startUpgrading();
    auto.startBuying();
    auto.startAccelerator();
}

auto.off = function () {
    auto.stopClicking();
    auto.stopUpgrading();
    auto.stopBuying();
    auto.stopAccelerator();
}


/**Accelerator mouse handler functions
**/
auto.accelerate = function () {
    if (auto.accelerator == null) {
        auto.accelerator = setInterval(function () {
            var bc = document.getElementById('bigCookie');
            for (var i = 0; i < 10; i++) {
                bc.click();
            }
        }, 10); //TODO this doesn't clcik as fast as it should
    }
}

auto.decelerate = function () {
    if (auto.accelerator) {
        clearInterval(auto.accelerator);
        auto.accelerator = null;
    }
}

/** Enable Click accelerator when mouse over cookie
**/
auto.startAccelerator = function () {
    var target = document.getElementById('bigCookie');
    target.addEventListener("mouseenter", auto.accelerate);
    target.addEventListener("mouseleave", auto.decelerate);
}

auto.stopAccelerator = function () {
    auto.decelerate();
    var target = document.getElementById('bigCookie');
    target.removeEventListener("mouseenter", auto.accelerate);
    target.removeEventListener("mouseleave", auto.decelerate);

}

/** Golden Cookie Clicker
**/
auto.clickGoldenIfPresent = function () {
    document.querySelectorAll("div.shimmer").forEach((b) => { console.log("Golden!"); b.click(); });
}

/** Auto cookie clicker 
**/
auto.startClicking = function () {
    if (!auto.clicking) {
        auto.clicking = setInterval(function () {
            document.getElementById('bigCookie').click();
            auto.clickGoldenIfPresent();
        }, 500);
    }
}

auto.stopClicking = function () {
    if (auto.clicking) {
        clearInterval(auto.clicking);
        auto.clicking = null;
    }
}

/** Auto upgrade
*/
auto.startUpgrading = function () {
    if (!auto.Upgrading) {
        auto.Upgrading = setInterval(function () {
            document.getElementById('upgrade0').click();
        }, 500);
    }
}

auto.stopUpgrading = function () {
    if (auto.Upgrading) {
        clearInterval(auto.Upgrading);
        auto.Upgrading = null;
    }
}

/** Auto product buyer
*/
auto.startBuying = function () {
    if (!auto.Buying) {
        auto.Buying = setInterval(tryToBuyMostCostEffective, 45 * 1000);
    }
}

auto.stopBuying = function () {
    if (auto.Buying) {
        clearInterval(auto.Buying);
        auto.Buying = null;
    }
}

/**Strategies for buying buildings (products)

/** Naiive - just buy the first one you can afford from enabled ones

**/
function tryToBuyNaive() {
    for (var i = 20; i >= 0; i--) {
        //TODO- upgrade to Game.Objects as in tryToBuyMostCostEffective
        var prodEl = document.getElementById('product' + i);
        if (prodEl && prodEl.classList.contains('enabled')) {
            prodEl.click();
            break;
        }
    }
}


/** Try and determine most cost effective and wait for more epenseive if the CPS gain is better
Game.UpgradesInStore[0].basePrice 

Game.Objects[prod].price
Game.Objects[prod].cps(Game.Objects[prod])
Game.cookiesPs

**/
auto.logBenefits = function (name, cost, cps, affordability, benefit) {
    console.log("" + Beautify(cps) + ", $" + Beautify(cost) + " - " + name + ", " + affordability.toFixed(2) + ", " + benefit.toFixed(2));
}

function tryToBuyMostCostEffective() {
    const intervalMinutes = 10;
    var nextInterval = intervalMinutes * 60;
    var cpsFiveMins = Game.cookiesPs * nextInterval; //TODO current cookies + future
    console.log("CPS/" + intervalMinutes + "mins: " + Beautify(cpsFiveMins));

    var oneToBuy = null;
    var oneToBuyBenefit = 0;

    //Buildings        
    for (var p in Game.Objects) {
        var prod = Game.Objects[p]
        var prodCPS = prod.cps(prod);
        var prodPrice = prod.price;

        var affordability = cpsFiveMins / prodPrice;

        if (prod.locked == 0) {
            var benefit = affordability * prodCPS;
            if (benefit > oneToBuyBenefit) {
                oneToBuy = prod;
                oneToBuyBenefit = benefit;
            }
            auto.logBenefits(prod.name, prodPrice, prodCPS, affordability, benefit);
        }
    }

    //Upgrades
    Game.UpgradesInStore.forEach((e) => {
        //building multiplier check
        var building = e.buildingTie;
        if (building && e.baseDesc.toLowerCase().includes("twice")) {
            var potentialCPS = building.cps(building) * 2;
            var basePrice = e.basePrice;
            var affordability = (Game.cookiesPs * 10 * 60) / basePrice; //TODO use setting for 10 mins to match above
            var benefit = affordability * potentialCPS;

            if (benefit > oneToBuyBenefit) {
                oneToBuy = e;
                oneToBuyBenefit = benefit;
            }
            auto.logBenefits(e.name, basePrice, potentialCPS, affordability, benefit);
        }
    });


    if (oneToBuy != null) {
        console.log("Buying: " + oneToBuy.name);
        oneToBuy.buy();
    }
}



