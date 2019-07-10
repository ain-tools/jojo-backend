let arrayOfHeroOBJs = [
    { name: "jotaro", fullName: "Jotaro Kujo", ability: "Almighty Punch", abilityDesc: "Deal a massive amount of damage (20 dmg).", hp: 180, mana: 150, costOfManaSpell: 70 },
    { name: "giorno", fullName: "Giorno Giovanna", ability: "Create life ", abilityDesc: "Heal your target (20 heal).",hp: 150, mana: 155,costOfManaSpell: 70  },
    { name: "joseph", fullName: "Joseph Joestar", ability:"Oh My God!", abilityDesc: "Heal your target with motivation. (10 heal).",hp: 145, mana: 160,costOfManaSpell: 40  },
    { name: "dio", fullName:"Dio Brando", ability:"No Ability" ,abilityDesc:"Dio's superior stats compensate for his lack of an ability.",hp: 185, mana: 170,costOfManaSpell: 0  },
    { name: "kakyoin", fullName:"Kakyoin Noriaki", ability:"Emerald Splash", abilityDesc: "nO oNe CaN jUsT dEfLeCt ThE eMeRaLd SpLaSh (10 dmg).",hp: 165, mana: 165, costOfManaSpell: 40  },
    { name: "avdol", fullName:"Avdol Muhammad", ability:"Fireball", abilityDesc: "Burn your foes to a crisp with a fireball (15 dmg).",hp: 150, mana: 180,costOfManaSpell: 55  },
    { name: "polnareff", fullName: "Jean Pierre Polnareff", ability:"Quick Stab", abilityDesc: "Stab your target quickly (7 dmg).",hp: 175, mana: 155,costOfManaSpell: 30  },
    { name: "koichi", fullName:"Koichi Hirose",ability:"Pumped up!", abilityDesc: "Heal your target by motivating them (15 heal).",hp: 140, mana: 165,costOfManaSpell: 55  },
    { name: "rohan", fullName:"Rohan Kishibe", ability:"Written Command", abilityDesc: "Command a target to heal itself.(7 heal)",hp: 145, mana: 160,costOfManaSpell: 30  },
    { name: "okuyasu", fullName:"Okuyasu Nijimura", ability:"Void Hand", abilityDesc: "Deal a massive amount of damage (20 dmg).",hp: 170, mana: 160,costOfManaSpell: 50  },
    { name: "josuke", fullName:"Josuke Higashikata", ability:" Repair", abilityDesc: "Heal your target (20 heal).",hp: 165, mana: 140 ,costOfManaSpell: 70  }
]
//total of mana and hp should be the same except for dio
//healing heroes should have lower stats
//base stats : 140 hp 140 mana, bonus stats : 50, healing class punishment: -25 bonus stats 

function getHero(hero) {
    for (let i = 0; i < arrayOfHeroOBJs.length; i++) {
        if (arrayOfHeroOBJs[i].name == hero) {
            return arrayOfHeroOBJs[i];
        }
    }
    return false;
}

function castSpell(hero) {
    let returnValue;
    if (hero == "jotaro") {
        //almightyPunch(target);
        returnValue=-20;
    } else if (hero == "giorno") {
        returnValue= 20;
    } else if (hero == "joseph") {
        //ohMyGod(target);
        returnValue= 10;
    } else if (hero == "kakyoin") {
        //emeraldSplash(target);
        returnValue= -10;
    } else if (hero == "avdol") {
        //fireball(target);
        returnValue= -15;
    } else if (hero == "polnareff") {
        //evasion();
        returnValue= -7;
    } else if (hero == "koichi") {
        //motivationBoost(target);
        returnValue= 15;
    } else if (hero == "rohan") {
        //turnFoe(target);
        returnValue= 7;
    } else if (hero == "okuyasu") {
        //voidHand(target);
        returnValue= -20;
    } else if (hero == "josuke") {
        //repair(target);
        returnValue= 20;
    }else if(hero == "dio"){
        returnValue=0;
    }else{
        returnValue=0;
    }
    return returnValue;
}

module.exports = {
    getHero,
    castSpell
}