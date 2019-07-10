let arrayOfCardOBJ = [
    { nameOfCard: "Enigma", hp: 12, attack: -15, hpUseForSpell: 20, specialAbility: "Paper Seal", manaCost: 70, cardPrice: 0, imgURL: "../../assets/cards/enigma.png", abilityDesc: "Allows to seal away an opponent's card.", strategyTip:"You can remove powerful and buffed cards quickly before they cause any serious damage.",description: "Enigma is a dark colored humanoid Stand. Its body is covered in lighter colored standards resembling question marks." },
    { nameOfCard: "Sex Pistols", hp: 11, attack: -16, hpUseForSpell: 15, specialAbility: "Bullet Control", manaCost: 70, cardPrice: 0, imgURL: "../../assets/cards/sex-pistols.png", abilityDesc: "Attack up to 5 consecutive cards to the right of the target.", strategyTip:"You can use this as a finishing move to obliterate a multitude of injured stands.",description: "Sex Pistols is composed of six tiny bullet-like entities living inside a revolver, numbered from 1 to 7, skipping the number 4." },
    { nameOfCard: "Crazy Diamond", hp: 50, attack: -36, hpUseForSpell: 10, specialAbility: "Repair", manaCost: 120, cardPrice: 0, imgURL: "../../assets/cards/crazy-diamond.png", abilityDesc: "Heal a target.",  strategyTip:"You can keep Crazy Diamond alive by targeting itself, making it a powerful offensive card with high survivability.",description: "Crazy Diamond is humanoid, with a powerful build and tall stature (about two heads above Josuke)." },
    { nameOfCard: "Star Platinum", hp: 64, attack: -44, hpUseForSpell: 10, specialAbility: "Ora Ora Rush", manaCost: 140, cardPrice: 0, imgURL: "../../assets/cards/star-platinum.png", abilityDesc: "Deal massive damage to a specific target.", strategyTip:"If you need to kill a stand before your turn ends, you can kill them off quickly with this and still have mana remaining to damage the hero.", description: 'Star Platinum is one of the most human in appearance of humanoid Stands, resembling a tall, well-built man of similar proportions to Jotaro, if not more muscular.' },
    { nameOfCard: "The Hand", hp: 34, attack: -30, hpUseForSpell: 15, specialAbility: "Void Hand", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/the-hand.png", abilityDesc: "Hit multiple cards at once near the target.",  strategyTip:"Aim for the stand in between two other stands to inflict damage to as many stands as possible.",description: 'The Hand appears as a humanoid figure typically in attire similar to football pads, though it has several spikes jutting from them.' },
    { nameOfCard: "Chariot's Requiem", hp: 68, attack: -40, hpUseForSpell: 20, specialAbility: "Soul Manipulation", manaCost: 140, cardPrice: 0, imgURL: "../../assets/cards/chariot-requiem.png", abilityDesc: "Scramble the target's stats.",  strategyTip:"Be careful! This might end up making a card much more powerful and much weaker.",description: "It is the evolved form of Silver Chariot after being pierced by the Arrow. Aside from Gold Experience, it is the only other stand known to have a Requiem form." },
    { nameOfCard: "Yellow Temperance", hp: 34, attack: -30, hpUseForSpell: 30, specialAbility: "Consume", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/yellow-temperance.png", abilityDesc: "Drain the HP of your target to heal Yellow Temperance.",  strategyTip:"Yellow Temperance can overheal, making it's maximum HP much higher after draining another card.",description: "Yellow Temperance appears as an amorphous, yellow substance, with no mouth, eyes, nose or any other facial features, bound to its user." },
    { nameOfCard: "Surface", hp: 1, attack: 1, hpUseForSpell: 25, specialAbility: "Mimicry", manaCost: 70, cardPrice: 0, imgURL: "../../assets/cards/surface.png", abilityDesc: "Transform into the targeted card.",  strategyTip:"You can use this to replicate a powerful card of yours that is near death ensure board domination!",description: "Surface appears as a human-sized mannequin, with several screws sticking out of its head. While in action, Surface takes on the appearance of another person - matching voice, mannerisms, and clothing - save for screw on the forehead." },
    { nameOfCard: "The World", hp: 60, attack: -48, hpUseForSpell: 60, specialAbility: "DA WARUDO", manaCost: 140, cardPrice: 0, imgURL: "../../assets/cards/the-world.png", abilityDesc: "Destroy all cards of the target's side except the target.", strategyTip:"Aim for the weakest card on the ennemy's side.", description: "The World is an exceptionally powerful Close-range Stand much like Star Platinum as noted by Noriaki Kakyoin and Jotaro Kujo, but boasting an effective manifestation range of approximately 10 meters." },
    { nameOfCard: "Heaven's Door", hp: 32, attack: -32, hpUseForSpell: 30, specialAbility: "Written Commands", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/heaven-door.png", abilityDesc: "Convert an ennemy card into a friendly card or vice versa.", strategyTip:"You can easily turn the tides with this card by turning the ennemy's most powerful card against it.", description: "Heaven's Door resembles a small boy similar to Rohan's manga character, Pink Dark Boy. It wears a long overcoat, closed to the end of its torso, and a bow tie." },
    { nameOfCard: "Echoes", hp: 34, attack: -30, hpUseForSpell: 10, specialAbility: "Freeze", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/echoes.png", abilityDesc: "Increase the ability and attack cost of a card.",  strategyTip:"Render powerful stands useless and don't finish them off, waste an opponent's board space.",description: "Echoes was born in extremely unusual circumstances. Koichi was stabbed by the Arrow, but due to not having the necessary fighting spirit, should have died; however Josuke Higashikata healed him with Crazy Diamond before he could die and thus Koichi survived, acquiring a Stand in the process." },
    { nameOfCard: "Stray Cat", hp: 12, attack: -17, hpUseForSpell: 10, specialAbility: "Aerokinesis", manaCost: 70, cardPrice: 0, imgURL: "../../assets/cards/stray-cat.png", abilityDesc: "Hit multiple cards at once near the target.",  strategyTip:"Aim for the stand in between two other stands to inflict damage to as many stands as possible.",description: "Stray Cat is a Stand bound to a plant shown having a thick stem for its body and big leaves that operate like arms. Its leaves are dexterous enough to grab objects." },
    { nameOfCard: "Aerosmith", hp: 30, attack: -34, hpUseForSpell: 15, specialAbility: "Guns and Bomb", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/aerosmith.png", abilityDesc: "Hit multiple cards at once near the target.", strategyTip:"Aim for the stand in between two other stands to inflict damage to as many stands as possible.",description: "Aerosmith is a powerful battle-oriented Stand possessing not only a wide array of powerful weaponry to destroy its enemies." },
    { nameOfCard: "Cheap Trick", hp: 10, attack: -10, hpUseForSpell: 10, specialAbility: "Attachment", manaCost: 70, cardPrice: 0, imgURL: "../../assets/cards/cheap-trick.png", abilityDesc: "Increase the attack cost of a card.", strategyTip:"Render powerful stands useless and don't finish them off, waste an opponent's board space.",description: "Cheap Trick is obsessed with killing the one whose back it is attached to by making others see it. Its personality is vicious and sadistic." },
    { nameOfCard: "Emperor", hp: 10, attack: -21, hpUseForSpell: 15, specialAbility: "Homing Bullets", manaCost: 70, cardPrice: 0, imgURL: "../../assets/cards/emperor.png", abilityDesc: "Attack a card and increase it's attack cost.", strategyTip:"Emperor is a powerful offensive stand considering it's cheap mana cost, making it easy to immediately attack after being summoned.",description: "As a gun Stand, Emperor functions as a weapon for Hol Horse. Due to its straightforward nature, Hol Horse must compensate through cooperation with allies to gain the upper hand." },
    { nameOfCard: "Hermit Purple", hp: 15, attack: -5, hpUseForSpell: 10, specialAbility: "Divination", manaCost: 50, cardPrice: 0, imgURL: "../../assets/cards/hermit-purple.png", abilityDesc: "Buff your target's attack. Decrease attack cost and ability cost.", strategyTip:"You can pair this with a cheap card in the first turn, so that by the second turn, the card being buffed has enough power to one shot the hero.",description: "Hermit Purple manifests itself as multiple, purple, thorn-covered vines that spawn from Joseph's hands." },
    { nameOfCard: "Green Day", hp: 50, attack: -35, hpUseForSpell: 25, specialAbility: "Mold Infestation", manaCost: 120, cardPrice: 0, imgURL: "../../assets/cards/green-day.png", abilityDesc: "Damage ALL the cards on the board.", strategyTip:"It attacks itself as well.",description: "Green Day is an overwhelmingly deadly Stand as its mold has the potential to massacre whole cities." },
    { nameOfCard: "Killer Queen", hp: 65, attack: -42, hpUseForSpell: 15, specialAbility: "Bomb", manaCost: 140, cardPrice: 0, imgURL: "../../assets/cards/killer-queen.png", abilityDesc: "Attack your target. If the target dies after the bomb attack then the nearest cards will die as well.", strategyTip:"Make sure to use this when the opponent has more than one stand, and that it's already near death.",description: "Killer Queen is unusual among humanoid Stands with complete faces in that its facial expression almost never reflects that of its user, and is instead nearly permanently locked in a wide-eyed, neutral position." },
    { nameOfCard: "Love Deluxe", hp: 32, attack: -32, hpUseForSpell: 15, specialAbility: "Hair Manipulation", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/love-deluxe.png", abilityDesc: "Attack your target and increase the target's attack cost and ability cost.", strategyTip:"Love Deluxe is one of the only stands that could be a match against high tier stands, because of the debuff she can inflict.",description: "Love Deluxe is bound to the hair of its user Yukako. Because it is bound to an object, Yukako takes no damage from her hair being attacked or cut. This also makes it visible to non-Stand users." },
    { nameOfCard: "Magician's Red", hp: 30, attack: -30, hpUseForSpell: 10, specialAbility: "Pyrokinesis", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/magician-red.png", abilityDesc: "Burn your target.", strategyTip:"If you need to kill a stand before your turn ends, you can kill them off quickly with this and still have mana remaining to damage the hero.",description: "Magician's Red appears as a humanoid figure with a bird-like head. It has a heavily muscular upper body and its feathered legs are sometimes covered in burning flames. Its arms have claws instead of nails and it wears dark bracelets on both of its wrists." },
    { nameOfCard: "Moody Blues", hp: 30, attack: -20, hpUseForSpell: 15, specialAbility: "Rebroadcasting", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/moody-blues.png", abilityDesc: "Increase the attack cost of a card twice it's original cost.", strategyTip:"Insanely powerful against high tier stands, not so much against cheap stands.",description: "Moody Blues is a humanoid Stand of a height and build similar to Abbacchio's. It is clothed from its head to its knees in a semitransparent piece of medium shade, open between the base of its neck and its crotch, and which forms a tent between its head and its shoulders." },
    { nameOfCard: "Purple Haze", hp: 45, attack: -35, hpUseForSpell: 20, specialAbility: "Virus Infection", manaCost: 120, cardPrice: 0, imgURL: "../../assets/cards/purple-haze.png", abilityDesc: "Damage ALL the cards on the board. The untargeted side will receive less damage.", strategyTip:"It has the same ability as Green Day,except it's more precise and less deadly.",description: "Purple Haze is a humanoid Stand of a height and build similar to Fugo's. Its face and body are patterned by horizontal lozenges of alternating shade, and armor pieces are present on its shoulders, elbows, and knees." },
    { nameOfCard: "Ratt", hp: 10, attack: -15, hpUseForSpell: 10, specialAbility: "Melting Darts", manaCost: 70, cardPrice: 0, imgURL: "../../assets/cards/ratt.png", abilityDesc: "Attack your target. If the target doesn't die, the target's HP will go to 50% of it's maximum.", strategyTip:"You can use this on your first shot, and then finish off a stand with normal attack.",description: "Ratt has the appearance of a machine resembling a shield with a camera lens in the middle and two supporting legs with a cannon in its back. It appears to have a structure resembling a jaw accompanied by numerous sharp fang-like teeth." },
    { nameOfCard: "Harvest", hp: 30, attack: -25, hpUseForSpell: 10, specialAbility: "Clone", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/harvest.png", abilityDesc: "Allows to clone your Harvest on the target's side.",strategyTip:"Waste space on your opponent's board with Clone, as they can only use one type of stand once per turn!", description: "Harvest is one of the few Stands composed of about 500 small units that may act individually." },
    { nameOfCard: "Silver Chariot", hp: 45, attack: -40, hpUseForSpell: 15, specialAbility: "Armor Off", manaCost: 120, cardPrice: 0, imgURL: "../../assets/cards/silver-chariot.png", strategyTip:"A good way to turn this stand into a glass cannon.",abilityDesc: "Silver Chariot's attack cost and ability cost decrease by 50% of it's maximum, but it's HP decreases by 50% as well.", description: "In appearance, Silver Chariot looks like a thin, robotic humanoid clad in silver, medieval armor, armed with a cup-hilted rapier. Although Silver Chariot is thin, it wields heavy plate armor spiked at the shoulder pads and elbow pads." },
    { nameOfCard: "Strength", hp: 55, attack: -35, hpUseForSpell: 20, specialAbility: "Power", manaCost: 120, cardPrice: 0, imgURL: "../../assets/cards/strength.png", strategyTip:"What Strength lacks in tactical efficiency, it more than makes up for in powerful stats that can be boosted.",abilityDesc: "Increases Strength's attack and hp (Attack can only be buffed once).", description: "Strength is a Stand bound to a small yacht, which is then transformed into a gigantic derelict freighter named 'Big Daddy'." },
    { nameOfCard: "Talking Head", hp: 10, attack: -1, hpUseForSpell: 5, specialAbility: "Tongue Control", manaCost: 30, cardPrice: 0, imgURL: "../../assets/cards/talking-head.png", strategyTip:"Render powerful stands useless and don't finish them off, waste an opponent's board space.",abilityDesc: "Reduces attack of targeted card.", description: "Talking Head appears as a semi-humanoid looking Stand about the size of a human tongue. While its torso looks human, a segmented tail replaces its lower body parts." },
    { nameOfCard: "The Lock", hp: 30, attack: -1, hpUseForSpell: 10, specialAbility: "Guilt Increase", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/the-lock.png", abilityDesc: "Increase attack cost depending on the attack of targeted card.", strategyTip:"Very powerful against offensive stands.",description: "The Lock takes on the appearance of a giant U-Shaped Lock with the character 銭 engraved on the front. It appears hooked onto the target's heart, appearing fused into their chest." },
    { nameOfCard: "The Sun", hp: 10, attack: -15, hpUseForSpell: 20, specialAbility: "Nova Blast", manaCost: 70, cardPrice: 0, imgURL: "../../assets/cards/the-sun.png", abilityDesc: "Destroy ALL cards from the board.", strategyTip:"Are you desperate? This will solve all your problems.",description: "Sun appears as a fiery sphere imitating the sun, though believed to be much smaller. It continuously hovers at around 100 meters from the ground." },
    { nameOfCard: "Tower Of Gray", hp: 7, attack: -20, hpUseForSpell: 7, specialAbility: "Quick Stinger", manaCost: 70, cardPrice: 0, imgURL: "../../assets/cards/tower-of-gray.png", abilityDesc: "Cheap attack made to finish off cards.", strategyTip:"You can pair this with Sex Pistols to injure stands before Sex Pistols finishes them off.",description: "Tower of Gray is a small and fragile Stand. However, it is also incredibly fast and nimble, and its secondary jaw grants it unsuspected destructive power." },
    { nameOfCard: "White Album", hp: 50, attack: -35, hpUseForSpell: 25, specialAbility: "Ice Lake", manaCost: 120, cardPrice: 0, imgURL: "../../assets/cards/white-album.png", abilityDesc: "Increase the attack cost and ability cost of all cards of the target's side.", strategyTip:"You can render the opponent's board entirely worthless by using this multiple times.",description: "White Album is rare among Stands in that it appears as a suit for Ghiaccio to wear. Protecting its user from harm and giving him the potent ability to freeze everything." },
    { nameOfCard: "Hierophant Green", hp: 30, attack: -35, hpUseForSpell: 15, specialAbility: "Emerald Splash", manaCost: 100, cardPrice: 0, imgURL: "../../assets/cards/hierophant-green.png", abilityDesc: "NO ONE CAN JUST DEFLECT THE EMERALD SPLASH.", strategyTip:"Kekyoin.",description: "Hierophant Green is an elastic and remote Stand, capable of being deployed far away from its user and performing actions from a distance." }
]
//mana cost and attack/hp should correlate, 
//70 = 10 hp, 15 attack bonus 2 points
//100 = 30 hp, 30 attack bonus 4 points
//120 = 45 hp, 35 attack bonus 6 points
//140 = 60 hp, 40 attack bonus 8 points
//1 extra bonus point = +5 mana

//special ability and hpuseforspell should correlate

function getAllCards() {
    return arrayOfCardOBJ;
}

function fullCardInfo(nameOfCard) {
    for (let i = 0; i < arrayOfCardOBJ.length; i++) {
        if (nameOfCard == arrayOfCardOBJ[i].nameOfCard) {
            return arrayOfCardOBJ[i];
        }
    }
}

function castSpellCard(nameOfCard, target, arrayOfLaidDownCards, untargetedArrayOfLaidDownCards, friendlyLaidCards, unfriendlyLaidCards) {
    let laidCards = arrayOfLaidDownCards;
    let untargetedLaidCard = untargetedArrayOfLaidDownCards;
    let friendlyCards = friendlyLaidCards;
    let unfriendlyCards = unfriendlyLaidCards;
    if (nameOfCard == "Enigma") {
        //seals an opponent's card //
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards.splice(i, 1);
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Harvest") {
        //clones harvest to targeted array //
        let harvest = fullCardInfo("Harvest");
        if (laidCards.length < 7) {
            laidCards.push(harvest);
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Crazy Diamond") {
        //heals the target //
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp + 25;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Star Platinum") {
        //attacks the target //
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 45;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "The Hand") {
        //attacks target and opponent's near //
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 25;
                if (laidCards[i - 1]) {
                    laidCards[i - 1].hp = laidCards[i - 1].hp - 25;
                }
                if (laidCards[i + 1]) {
                    laidCards[i + 1].hp = laidCards[i + 1].hp - 25;
                }
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Echoes") {
        //increase the cost of ability and attack of target //
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hpUseForSpell = laidCards[i].hpUseForSpell + 25;
                laidCards[i].manaCost = laidCards[i].manaCost + 30;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Heaven's Door") {
        //change side of target //
        let targetedCard = fullCardInfo(target);
        if (untargetedLaidCard.length < 7) {
            untargetedLaidCard.push(targetedCard);
            for (let i = 0; i < laidCards.length; i++) {
                if (laidCards[i].nameOfCard == target) {
                    laidCards.splice(i, 1);
                    break;
                }
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Stray Cat") {
        //attacks target and opponent's near //
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 15;
                if (laidCards[i - 1]) {
                    laidCards[i - 1].hp = laidCards[i - 1].hp - 15;
                }
                if (laidCards[i + 1]) {
                    laidCards[i + 1].hp = laidCards[i + 1].hp - 15;
                }
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Sex Pistols") {
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 15;
                if (laidCards[i + 1]) {
                    laidCards[i + 1].hp = laidCards[i + 1].hp - 15;
                }
                if (laidCards[i + 2]) {
                    laidCards[i + 2].hp = laidCards[i + 2].hp - 15;
                }
                if (laidCards[i + 3]) {
                    laidCards[i + 3].hp = laidCards[i + 3].hp - 15;
                }
                if (laidCards[i + 4]) {
                    laidCards[i + 4].hp = laidCards[i + 4].hp - 15;
                }
                if (laidCards[i + 5]) {
                    laidCards[i + 5].hp = laidCards[i + 5].hp - 15;
                }
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Chariot's Requiem") {
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                let originalManaCost = laidCards[i].manaCost;
                let originalHPCost = laidCards[i].hpUseForSpell;
                let originalHP = laidCards[i].hp;
                let originalAttack = laidCards[i].attack;
                laidCards[i].hpUseForSpell = originalManaCost;
                laidCards[i].manaCost = originalHPCost;
                laidCards[i].hp = originalAttack * -1;
                laidCards[i].attack = originalHP * -1;
                console.log(laidCards[i]);
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Yellow Temperance") {
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 35;
                for (let x = 0; x < friendlyCards.length; x++) {
                    if (friendlyCards[x].nameOfCard == "Yellow Temperance") {
                        friendlyCards[x].hp = friendlyCards[x].hp + 35;
                        break;
                    }
                }
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard, friendlyCards];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Surface") {
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                let cardToCopy = laidCards[i];
                for (let x = 0; x < friendlyCards.length; x++) {
                    if (friendlyCards[x].nameOfCard == "Surface") {
                        friendlyCards.splice(x, 1);
                        friendlyCards.push(cardToCopy);
                        break;
                    }
                }
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard, friendlyCards];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "The World") {
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard != target) {
                laidCards.splice(i, 1);
                i = 0;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Aerosmith") {
        //attacks target and opponent's near
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 15;
                if (laidCards[i - 1]) {
                    laidCards[i - 1].hp = laidCards[i - 1].hp - 15;
                }
                if (laidCards[i + 1]) {
                    laidCards[i + 1].hp = laidCards[i + 1].hp - 15;
                }
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Cheap Trick") {
        //increase mana cost of target
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].manaCost = laidCards[i].manaCost + 20;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Emperor") {
        //attacks target and opponent's near
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].manaCost = laidCards[i].manaCost + 10;
                laidCards[i].hp = laidCards[i].hp - 25;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Hermit Purple") {
        //Buff your target
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].manaCost = laidCards[i].manaCost - 10;
                laidCards[i].hpUseForSpell = laidCards[i].hpUseForSpell - 5;
                laidCards[i].attack = laidCards[i].attack - 5;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Green Day") {
        //attack everyone
        for (let i = 0; i < laidCards.length; i++) {
            laidCards[i].hp = laidCards[i].hp - 25;
        }
        for (let i = 0; i < untargetedLaidCard.length; i++) {
            untargetedLaidCard[i].hp = untargetedLaidCard[i].hp - 25;
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Killer Queen") {
        //attack target, if dies then nearest cards die as well
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 25;
                if (laidCards[i].hp <= 0) {
                    if (laidCards[i - 1]) {
                        laidCards.splice(i - 1, 1);
                    }
                    if (laidCards[i]) {
                        laidCards.splice(i, 1);
                    }
                }
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Love Deluxe") {
        //attack target, increase attack cost and ability cost
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 25;
                laidCards[i].manaCost = laidCards[i].manaCost + 15;
                laidCards[i].hpUseForSpell = laidCards[i].hpUseForSpell + 20;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Magician's Red") {
        //attacks the target
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 35;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Moody Blues") {
        //increace manaCost twice
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].manaCost = laidCards[i].manaCost * 2;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Purple Haze") {
        //attacks all targets
        for (let i = 0; i < laidCards.length; i++) {
            laidCards[i].hp = laidCards[i].hp - 15;
        }
        for (let i = 0; i < untargetedLaidCard.length; i++) {
            untargetedLaidCard[i].hp = untargetedLaidCard[i].hp - 10;
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Ratt") {
        //attack target, if not dead, reduce hp to 50%
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 10;
                if (laidCards[i].hp > 0) {
                    laidCards[i].hp = fullCardInfo(target).hp / 2;
                }
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Silver Chariot") {
        //decrease attack and ability cost,reduce hp by 50%
        for (let i = 0; i < friendlyCards.length; i++) {
            if (friendlyCards[i].nameOfCard == "Silver Chariot") {
                friendlyCards[i].hp = fullCardInfo("Silver Chariot").hp / 2;
                friendlyCards[i].manaCost = fullCardInfo("Silver Chariot").manaCost / 2;
                friendlyCards[i].hpUseForSpell = fullCardInfo("Silver Chariot").hpUseForSpell / 2;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard, friendlyCards];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Strength") {
        //increase attack and hp
        for (let i = 0; i < friendlyCards.length; i++) {
            if (friendlyCards[i].nameOfCard == "Strength") {
                friendlyCards[i].hp = friendlyCards[i].hp + 20;
                friendlyCards[i].attack = fullCardInfo("Strength").attack + 20;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard, friendlyCards];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Talking Head") {
        //reduce attack of target
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].attack = laidCards[i].attack + 10;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "The Lock") {
        //increase mana cost of target depending on attack
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].manaCost = laidCards[i].manaCost - (laidCards[i].attack / 2);
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "The Sun") {
        laidCards = [];
        untargetedLaidCard = [];
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Tower Of Gray") {
        //attacks the target
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 15;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "White Album") {
        //increase attack and ability cost on target side
        for (let i = 0; i < laidCards.length; i++) {
            laidCards[i].manaCost = laidCards[i].manaCost + 10;
            laidCards[i].hpUseForSpell = laidCards[i].hpUseForSpell + 10;
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    } else if (nameOfCard == "Hierophant Green") {
        //attacks the target
        for (let i = 0; i < laidCards.length; i++) {
            if (laidCards[i].nameOfCard == target) {
                laidCards[i].hp = laidCards[i].hp - 35;
                break;
            }
        }
        let laidCardsOfBothSides = [laidCards, untargetedLaidCard];
        return laidCardsOfBothSides;
    }
}

module.exports = {
    fullCardInfo,
    castSpellCard,
    getAllCards
}