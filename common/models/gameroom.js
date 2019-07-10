'use strict';
let app = require('../../server/server');
let heroHelper = require('./heroSelection');
let cardHelper = require('./cardHelper');
let es = require('event-stream');
require('events').EventEmitter.defaultMaxListeners = 25
//var cors_proxy = require('cors-anywhere');

//setting up the streaming server
var http = require('http');

//create a server object:

let server = http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
}).listen(/*process.env.PORT*/8080); //the server object listens on port 80

/*
// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;
 
let server = cors_proxy.createServer({
    originWhitelist: [] // Allow all origins
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
*/

const io = require('socket.io')(server);

let socketConnections = [];

module.exports = function (Gameroom) {
    //remove endpoints
    Gameroom.disableRemoteMethodByName("replaceOrCreate", true);
    Gameroom.disableRemoteMethodByName("patchAttributes", true);
    Gameroom.disableRemoteMethodByName("replaceById", true);
    Gameroom.disableRemoteMethodByName("replace", true);
    Gameroom.disableRemoteMethodByName("createChangeStream", true);
    Gameroom.disableRemoteMethodByName("prototype.updateAttributes", true);
    Gameroom.disableRemoteMethodByName("upsertWithWhere", true);
    Gameroom.disableRemoteMethodByName("upsert", true);
    Gameroom.disableRemoteMethodByName("updateAll", true);
    Gameroom.disableRemoteMethodByName("updateAttributes", false);
    Gameroom.disableRemoteMethodByName("find", true);
    Gameroom.disableRemoteMethodByName("findOne", true);
    Gameroom.disableRemoteMethodByName("deleteById", true);
    Gameroom.disableRemoteMethodByName("confirm", true);
    Gameroom.disableRemoteMethodByName("count", true);
    Gameroom.disableRemoteMethodByName("exists", true);
    Gameroom.disableRemoteMethodByName("resetPassword", true);
    Gameroom.disableRemoteMethodByName('__count__accessTokens', false);
    Gameroom.disableRemoteMethodByName('__create__accessTokens', false);
    Gameroom.disableRemoteMethodByName('__delete__accessTokens', false);
    Gameroom.disableRemoteMethodByName('__destroyById__accessTokens', false);
    Gameroom.disableRemoteMethodByName('__findById__accessTokens', false);
    Gameroom.disableRemoteMethodByName('__get__accessTokens', false);
    Gameroom.disableRemoteMethodByName('__updateById__accessTokens', false);



    Gameroom.afterRemote("create", function gameActions(ctx, model, next) {
        // add check if player left game
        if (ctx.args.data.action == "gameAction") {
            let lastPlayedAction = [];
            model.delete();
            //find the gameroom in which action is done
            Gameroom.app.models.gameroom.find({ where: { id: ctx.args.data.gameroomId } }, function (err, gameroomInfo) {
                //checking the access token of the person who is making this request
                let userId;
                Gameroom.app.models.AccessToken.find({ where: { id: ctx.req.query.access_token } }, function (err, instance) {
                    userId = instance[0].userId;
                    Gameroom.app.models.player.find({ where: { id: userId } }, function (err, player) {
                        let userObj = gameroomInfo[0].player1;
                        userObj = JSON.parse(userObj);
                        let usedCardsPlayer1 = [];
                        let usedCardsPlayer2 = [];

                        //making sure the user is allowed and is his turn
                        console.log(player[0].username, gameroomInfo[0].whosTurn, ctx.args.data);
                        if (ctx.args.data.subAction == "forfeit") {
                            if (player[0].username == userObj.username) {
                                gameroomInfo[0].updateAttributes({ theWinner: JSON.parse(gameroomInfo[0].player2).username }, (err, player) => { });
                                Gameroom.app.models.player.find({ where: { username: JSON.parse(gameroomInfo[0].player2).username } }, function (err, player2) {
                                    player2[0].updateAttributes({ gamesPlayed: player2[0].gamesPlayed + 1 }, (err, success) => { });
                                    player2[0].updateAttributes({ wins: player2[0].wins + 1 }, (err, success) => { });
                                    player2[0].updateAttributes({ cash: player2[0].cash + 420 }, (err, instance) => { });
                                    player2[0].updateAttributes({ isCurrentlyPlaying: false }, (err, instance) => { });
                                    player2[0].updateAttributes({ gameroomId: "Finished" }, (err, instance) => { });
                                    player2[0].updateAttributes({ cards: [] });
                                })
                                Gameroom.app.models.player.find({ where: { username: JSON.parse(gameroomInfo[0].player1).username } }, function (err, player1) {
                                    player1[0].updateAttributes({ gamesPlayed: player1[0].gamesPlayed + 1 }, (err, success) => { });
                                    player1[0].updateAttributes({ losses: player1[0].losses + 1 }, (err, success) => { });
                                    player1[0].updateAttributes({ isCurrentlyPlaying: false }, (err, instance) => { });
                                    player1[0].updateAttributes({ gameroomId: "Finished" }, (err, instance) => { });
                                    player1[0].updateAttributes({ cards: [] });
                                })
                            } else {
                                gameroomInfo[0].updateAttributes({ theWinner: JSON.parse(gameroomInfo[0].player1).username }, (err, player) => { });
                                Gameroom.app.models.player.find({ where: { username: JSON.parse(gameroomInfo[0].player1).username } }, function (err, player1) {
                                    player1[0].updateAttributes({ gamesPlayed: player1[0].gamesPlayed + 1 }, (err, success) => { });
                                    player1[0].updateAttributes({ wins: player1[0].wins + 1 }, (err, success) => { });
                                    player1[0].updateAttributes({ cash: player1[0].cash + 420 }, (err, instance) => { });
                                    player1[0].updateAttributes({ isCurrentlyPlaying: false }, (err, instance) => { });
                                    player1[0].updateAttributes({ gameroomId: "Finished" }, (err, instance) => { });
                                    player1[0].updateAttributes({ cards: [] });
                                })
                                Gameroom.app.models.player.find({ where: { username: JSON.parse(gameroomInfo[0].player2).username } }, function (err, player2) {
                                    player2[0].updateAttributes({ gamesPlayed: player2[0].gamesPlayed + 1 }, (err, success) => { });
                                    player2[0].updateAttributes({ losses: player2[0].losses + 1 }, (err, success) => { });
                                    player2[0].updateAttributes({ isCurrentlyPlaying: false }, (err, instance) => { });
                                    player2[0].updateAttributes({ gameroomId: "Finished" }, (err, instance) => { });
                                    player2[0].updateAttributes({ cards: [] });
                                })
                            }
                        }
                        if (player[0].username == gameroomInfo[0].whosTurn) {
                            //subaction user can make
                            if (ctx.args.data.subAction == "layCard") {
                                if (player[0].username == userObj.username && gameroomInfo[0].laidCardsPlayer1.length < 7) {
                                    for (let i = 0; i < gameroomInfo[0].deckOfPlayer1.length; i++) {
                                        if (ctx.args.data.laidCard == gameroomInfo[0].deckOfPlayer1[i].nameOfCard && gameroomInfo[0].manaOfPlayer1 >= cardHelper.fullCardInfo(ctx.args.data.laidCard).manaCost) {
                                            let updatedDeckOfPlayer = gameroomInfo[0].deckOfPlayer1;
                                            updatedDeckOfPlayer.splice(i, 1);
                                            let updatedLaidCards = gameroomInfo[0].laidCardsPlayer1;
                                            updatedLaidCards.push(cardHelper.fullCardInfo(ctx.args.data.laidCard));
                                            gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedLaidCards });
                                            gameroomInfo[0].updateAttributes({ deckOfPlayer1: updatedDeckOfPlayer });
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer1: gameroomInfo[0].manaOfPlayer1 - cardHelper.fullCardInfo(ctx.args.data.laidCard).manaCost });
                                            lastPlayedAction = ["layCard", ctx.args.data.laidCard, player[0].username];
                                            break;
                                        }
                                    }
                                } else if (player[0].username == JSON.parse(gameroomInfo[0].player2).username && gameroomInfo[0].laidCardsPlayer2.length < 7) {
                                    for (let i = 0; i < gameroomInfo[0].deckOfPlayer2.length; i++) {
                                        if (ctx.args.data.laidCard == gameroomInfo[0].deckOfPlayer2[i].nameOfCard && gameroomInfo[0].manaOfPlayer2 >= cardHelper.fullCardInfo(ctx.args.data.laidCard).manaCost) {
                                            let updatedDeckOfPlayer = gameroomInfo[0].deckOfPlayer2;
                                            updatedDeckOfPlayer.splice(i, 1);
                                            let updatedLaidCards = gameroomInfo[0].laidCardsPlayer2;
                                            updatedLaidCards.push(cardHelper.fullCardInfo(ctx.args.data.laidCard));
                                            gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedLaidCards });
                                            gameroomInfo[0].updateAttributes({ deckOfPlayer2: updatedDeckOfPlayer });
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer2: gameroomInfo[0].manaOfPlayer2 - cardHelper.fullCardInfo(ctx.args.data.laidCard).manaCost });
                                            lastPlayedAction = ["layCard", ctx.args.data.laidCard, player[0].username];
                                            break;
                                        }
                                    }
                                }
                            } else if (ctx.args.data.subAction == "castSpell") {
                                if (player[0].username == JSON.parse(gameroomInfo[0].player1).username && gameroomInfo[0].manaOfPlayer1 >= heroHelper.getHero(player[0].heroSelected).costOfManaSpell) {
                                    if (ctx.args.data.target != JSON.parse(gameroomInfo[0].player2).username && ctx.args.data.target != JSON.parse(gameroomInfo[0].player1).username) {
                                        if (ctx.args.data.targetSide == "ennemy") {
                                            for (let i = 0; i < gameroomInfo[0].laidCardsPlayer2.length; i++) {
                                                if (ctx.args.data.target == gameroomInfo[0].laidCardsPlayer2[i].nameOfCard) {
                                                    let updatedCardArray = gameroomInfo[0].laidCardsPlayer2;
                                                    updatedCardArray[i].hp = updatedCardArray[i].hp + heroHelper.castSpell(player[0].heroSelected);
                                                    lastPlayedAction = ["castSpell", ctx.args.data.target, null];
                                                    if (updatedCardArray[i].hp <= cardHelper.fullCardInfo(updatedCardArray[i].nameOfCard).hp) {
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                                        updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                                    } else {
                                                        let overHealedAmount = updatedCardArray[i].hp - cardHelper.fullCardInfo(updatedCardArray[i].nameOfCard).hp;
                                                        updatedCardArray[i].hp = updatedCardArray[i].hp - overHealedAmount;
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                                        updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                                    }
                                                    break;
                                                }
                                            }
                                        } else {
                                            for (let i = 0; i < gameroomInfo[0].laidCardsPlayer1.length; i++) {
                                                if (ctx.args.data.target == gameroomInfo[0].laidCardsPlayer1[i].nameOfCard) {
                                                    let updatedCardArray = gameroomInfo[0].laidCardsPlayer1;
                                                    updatedCardArray[i].hp = updatedCardArray[i].hp + heroHelper.castSpell(player[0].heroSelected);
                                                    lastPlayedAction = ["castSpell", ctx.args.data.target, player[0].username];
                                                    if (updatedCardArray[i].hp <= cardHelper.fullCardInfo(updatedCardArray[i].nameOfCard).hp) {
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                                        updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                                    } else {
                                                        let overHealedAmount = updatedCardArray[i].hp - cardHelper.fullCardInfo(updatedCardArray[i].nameOfCard).hp;
                                                        updatedCardArray[i].hp = updatedCardArray[i].hp - overHealedAmount;
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                                        updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    } else if (ctx.args.data.target == JSON.parse(gameroomInfo[0].player2).username) {
                                        let updatedPlayer2HP = gameroomInfo[0].hpOfPlayer2;
                                        updatedPlayer2HP = updatedPlayer2HP + heroHelper.castSpell(player[0].heroSelected);
                                        lastPlayedAction = ["castSpell", ctx.args.data.target, null];
                                        if (updatedPlayer2HP <= heroHelper.getHero(JSON.parse(gameroomInfo[0].player2).heroSelected).hp) {
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer2: updatedPlayer2HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                            updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                        } else {
                                            let overHealedAmount = updatedPlayer2HP - heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).hp;
                                            updatedPlayer2HP = updatedPlayer2HP - overHealedAmount;
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer2: updatedPlayer2HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                            updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                        }
                                    } else if (ctx.args.data.target == JSON.parse(gameroomInfo[0].player1).username) {
                                        let updatedPlayer1HP = gameroomInfo[0].hpOfPlayer1;
                                        updatedPlayer1HP = updatedPlayer1HP + heroHelper.castSpell(player[0].heroSelected);
                                        lastPlayedAction = ["castSpell", ctx.args.data.target, player[0].username];
                                        if (updatedPlayer1HP <= heroHelper.getHero(JSON.parse(gameroomInfo[0].player1).heroSelected).hp) {
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer1: updatedPlayer1HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                            updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                        } else {
                                            let overHealedAmount = updatedPlayer1HP - heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).hp;
                                            updatedPlayer1HP = updatedPlayer1HP - overHealedAmount;
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer1: updatedPlayer1HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                            updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                        }
                                    }
                                } else if (player[0].username == JSON.parse(gameroomInfo[0].player2).username && gameroomInfo[0].manaOfPlayer2 >= heroHelper.getHero(player[0].heroSelected).costOfManaSpell) {
                                    if (ctx.args.data.target != JSON.parse(gameroomInfo[0].player1).username && ctx.args.data.target != JSON.parse(gameroomInfo[0].player2).username) {
                                        if (ctx.args.data.targetSide == "ennemy") {
                                            for (let i = 0; i < gameroomInfo[0].laidCardsPlayer1.length; i++) {
                                                if (ctx.args.data.target == gameroomInfo[0].laidCardsPlayer1[i].nameOfCard) {
                                                    let updatedCardArray = gameroomInfo[0].laidCardsPlayer1;
                                                    updatedCardArray[i].hp = updatedCardArray[i].hp + heroHelper.castSpell(player[0].heroSelected);
                                                    lastPlayedAction = ["castSpell", ctx.args.data.target, null];
                                                    if (updatedCardArray[i].hp <= cardHelper.fullCardInfo(updatedCardArray[i].nameOfCard).hp) {
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                                        updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                                    } else {
                                                        let overHealedAmount = updatedCardArray[i].hp - cardHelper.fullCardInfo(updatedCardArray[i].nameOfCard).hp;
                                                        updatedCardArray[i].hp = updatedCardArray[i].hp - overHealedAmount;
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                                        updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                                    }
                                                    break;
                                                }
                                            }
                                        } else {
                                            for (let i = 0; i < gameroomInfo[0].laidCardsPlayer2.length; i++) {
                                                if (ctx.args.data.target == gameroomInfo[0].laidCardsPlayer2[i].nameOfCard) {
                                                    let updatedCardArray = gameroomInfo[0].laidCardsPlayer2;
                                                    updatedCardArray[i].hp = updatedCardArray[i].hp + heroHelper.castSpell(player[0].heroSelected);
                                                    lastPlayedAction = ["castSpell", ctx.args.data.target, player[0].username];
                                                    if (updatedCardArray[i].hp <= cardHelper.fullCardInfo(updatedCardArray[i].nameOfCard).hp) {
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                                        updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                                    } else {
                                                        let overHealedAmount = updatedCardArray[i].hp - cardHelper.fullCardInfo(updatedCardArray[i].nameOfCard).hp;
                                                        updatedCardArray[i].hp = updatedCardArray[i].hp - overHealedAmount;
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                                        updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    } else if (ctx.args.data.target == JSON.parse(gameroomInfo[0].player1).username) {
                                        let updatedPlayer1HP = gameroomInfo[0].hpOfPlayer1;
                                        updatedPlayer1HP = updatedPlayer1HP + heroHelper.castSpell(player[0].heroSelected);
                                        lastPlayedAction = ["castSpell", ctx.args.data.target, null];
                                        if (updatedPlayer1HP <= heroHelper.getHero(JSON.parse(gameroomInfo[0].player1).heroSelected).hp) {
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer1: updatedPlayer1HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                            updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                        } else {
                                            let overHealedAmount = updatedPlayer1HP - heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).hp;
                                            updatedPlayer1HP = updatedPlayer1HP - overHealedAmount;
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer1: updatedPlayer1HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                            updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                        }
                                    } else if (ctx.args.data.target == JSON.parse(gameroomInfo[0].player2).username) {
                                        let updatedPlayer2HP = gameroomInfo[0].hpOfPlayer2;
                                        updatedPlayer2HP = updatedPlayer2HP + heroHelper.castSpell(player[0].heroSelected);
                                        lastPlayedAction = ["castSpell", ctx.args.data.target, player[0].username];
                                        if (updatedPlayer2HP <= heroHelper.getHero(JSON.parse(gameroomInfo[0].player2).heroSelected).hp) {
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer2: updatedPlayer2HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                            updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                        } else {
                                            let overHealedAmount = updatedPlayer2HP - heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).hp;
                                            updatedPlayer2HP = updatedPlayer2HP - overHealedAmount;
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer2: updatedPlayer2HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                            updatedMana = updatedMana - heroHelper.getHero(player[0].heroSelected).costOfManaSpell;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                        }
                                    }
                                }
                            } else if (ctx.args.data.subAction == "pickCard") {
                                if (player[0].username == userObj.username && gameroomInfo[0].deckOfPlayer1.length < 9 && gameroomInfo[0].manaOfPlayer1 >= 35) {
                                    let updatedDeckOfPlayer = gameroomInfo[0].deckOfPlayer1;
                                    let randomNumber = Math.floor(Math.random() * player[0].stashedCards.length - 1) + 1;
                                    let randomCard = cardHelper.fullCardInfo(player[0].stashedCards[randomNumber]);
                                    updatedDeckOfPlayer.push(randomCard);
                                    let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                    updatedMana = updatedMana - 35;
                                    gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                    gameroomInfo[0].updateAttributes({ deckOfPlayer1: updatedDeckOfPlayer });
                                    lastPlayedAction = ["pickCard", randomCard.nameOfCard, player[0].username];
                                } else if (player[0].username == JSON.parse(gameroomInfo[0].player2).username && gameroomInfo[0].deckOfPlayer2.length < 9 && gameroomInfo[0].manaOfPlayer2 >= 35) {
                                    let updatedDeckOfPlayer = gameroomInfo[0].deckOfPlayer2;
                                    let randomNumber = Math.floor(Math.random() * player[0].stashedCards.length - 1) + 1;
                                    let randomCard = cardHelper.fullCardInfo(player[0].stashedCards[randomNumber]);
                                    updatedDeckOfPlayer.push(randomCard);
                                    let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                    updatedMana = updatedMana - 35;
                                    gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                    gameroomInfo[0].updateAttributes({ deckOfPlayer2: updatedDeckOfPlayer });
                                    lastPlayedAction = ["pickCard", randomCard.nameOfCard, player[0].username];
                                }
                            } else if (ctx.args.data.subAction == "endTurn") {
                                lastPlayedAction = ["endTurn", "No action"];
                                if (player[0].username == JSON.parse(gameroomInfo[0].player1).username) {
                                    let updatedMana = heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).mana;
                                    gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                    gameroomInfo[0].updateAttributes({ whosTurn: JSON.parse(gameroomInfo[0].player2).username });
                                    let updatedUsedCard = [];
                                    gameroomInfo[0].updateAttributes({ usedCardsPlayer1: updatedUsedCard });
                                } else if (player[0].username == JSON.parse(gameroomInfo[0].player2).username) {
                                    let updatedMana = heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).mana;
                                    gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                    gameroomInfo[0].updateAttributes({ whosTurn: JSON.parse(gameroomInfo[0].player1).username });
                                    let updatedUsedCard = [];
                                    gameroomInfo[0].updateAttributes({ usedCardsPlayer2: updatedUsedCard });
                                }
                            } else if (ctx.args.data.subAction == "playCardSpecialAbility") {
                                let cardSelected;
                                if (player[0].username == JSON.parse(gameroomInfo[0].player1).username) {
                                    for (let i = 0; i < gameroomInfo[0].laidCardsPlayer1.length; i++) {
                                        if (gameroomInfo[0].laidCardsPlayer1[i].nameOfCard == ctx.args.data.selectedCard) {
                                            cardSelected = gameroomInfo[0].laidCardsPlayer1[i];
                                            break;
                                        }
                                    }
                                }
                                let cardSelected2;
                                if (player[0].username == JSON.parse(gameroomInfo[0].player2).username) {
                                    for (let i = 0; i < gameroomInfo[0].laidCardsPlayer2.length; i++) {
                                        if (gameroomInfo[0].laidCardsPlayer2[i].nameOfCard == ctx.args.data.selectedCard) {
                                            cardSelected2 = gameroomInfo[0].laidCardsPlayer2[i];
                                            break;
                                        }
                                    }
                                }
                                if (player[0].username == JSON.parse(gameroomInfo[0].player1).username && gameroomInfo[0].hpOfPlayer1 > cardSelected.hpUseForSpell) {
                                    //checks if card is laid down
                                    let cardIsLaidDown = false;
                                    for (let i = 0; i < gameroomInfo[0].laidCardsPlayer1.length; i++) {
                                        if (gameroomInfo[0].laidCardsPlayer1[i].nameOfCard == ctx.args.data.selectedCard) {
                                            cardIsLaidDown = true;
                                        }
                                    }
                                    if (cardIsLaidDown) {
                                        if (ctx.args.data.target != JSON.parse(gameroomInfo[0].player2).username && ctx.args.data.target != JSON.parse(gameroomInfo[0].player1).username) {
                                            lastPlayedAction = ["playCardSpecialAbility", ctx.args.data.selectedCard, player[0].username,ctx.args.data.targetSide,ctx.args.data.target];
                                            if (ctx.args.data.targetSide == "ennemy") {
                                                let updatedCardArray = gameroomInfo[0].laidCardsPlayer2;
                                                let updatedCardArray2 = gameroomInfo[0].laidCardsPlayer1;
                                                //cast spell card
                                                updatedCardArray = cardHelper.castSpellCard(ctx.args.data.selectedCard, ctx.args.data.target, updatedCardArray, updatedCardArray2,updatedCardArray2,updatedCardArray);
                                                gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray[0] });
                                                if(updatedCardArray[2]){
                                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray[2] });
                                                }else{
                                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray[1] });
                                                }
                                                let updatedHP = gameroomInfo[0].hpOfPlayer1;
                                                updatedHP = updatedHP - cardSelected.hpUseForSpell;
                                                gameroomInfo[0].updateAttributes({ hpOfPlayer1: updatedHP });
                                            } else if (ctx.args.data.targetSide == "friend") {
                                                let updatedCardArray = gameroomInfo[0].laidCardsPlayer1;
                                                let updatedCardArray2 = gameroomInfo[0].laidCardsPlayer2;
                                                //cast spell card
                                                updatedCardArray = cardHelper.castSpellCard(ctx.args.data.selectedCard, ctx.args.data.target, updatedCardArray, updatedCardArray2,updatedCardArray,updatedCardArray2);
                                                gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray[1] });
                                                if(updatedCardArray[2]){
                                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray[2] });
                                                }else{
                                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray[0] });
                                                }
                                                let updatedHP = gameroomInfo[0].hpOfPlayer1;
                                                updatedHP = updatedHP - cardSelected.hpUseForSpell;
                                                gameroomInfo[0].updateAttributes({ hpOfPlayer1: updatedHP });
                                            }
                                        }
                                    }
                                } else if (player[0].username == JSON.parse(gameroomInfo[0].player2).username && gameroomInfo[0].hpOfPlayer2 > cardSelected2.hpUseForSpell) {
                                    //checks if card is laid down
                                    let cardIsLaidDown = false;
                                    for (let i = 0; i < gameroomInfo[0].laidCardsPlayer2.length; i++) {
                                        if (gameroomInfo[0].laidCardsPlayer2[i].nameOfCard == ctx.args.data.selectedCard) {
                                            cardIsLaidDown = true;
                                        }
                                    }
                                    if (cardIsLaidDown) {
                                        if (ctx.args.data.target != JSON.parse(gameroomInfo[0].player2).username && ctx.args.data.target != JSON.parse(gameroomInfo[0].player1).username) {
                                            lastPlayedAction = ["playCardSpecialAbility", ctx.args.data.selectedCard, player[0].username,ctx.args.data.targetSide,ctx.args.data.target];
                                            if (ctx.args.data.targetSide == "ennemy") {
                                                let updatedCardArray = gameroomInfo[0].laidCardsPlayer1;
                                                let updatedCardArray2 = gameroomInfo[0].laidCardsPlayer2;
                                                //cast spell card
                                                updatedCardArray = cardHelper.castSpellCard(ctx.args.data.selectedCard, ctx.args.data.target, updatedCardArray, updatedCardArray2,updatedCardArray2,updatedCardArray);
                                                gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray[0] });
                                                if(updatedCardArray[2]){
                                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray[2] });
                                                }else{
                                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray[1] });
                                                }
                                                let updatedHP = gameroomInfo[0].hpOfPlayer2;
                                                updatedHP = updatedHP - cardSelected2.hpUseForSpell;
                                                gameroomInfo[0].updateAttributes({ hpOfPlayer2: updatedHP });
                                            } else if (ctx.args.data.targetSide == "friend") {
                                                let updatedCardArray = gameroomInfo[0].laidCardsPlayer2;
                                                let updatedCardArray2 = gameroomInfo[0].laidCardsPlayer1;
                                                //cast spell card
                                                updatedCardArray = cardHelper.castSpellCard(ctx.args.data.selectedCard, ctx.args.data.target, updatedCardArray, updatedCardArray2,updatedCardArray,updatedCardArray2);
                                                gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray[1] });
                                                if(updatedCardArray[2]){
                                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray[2] });
                                                }else{
                                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray[0] });
                                                }
                                                let updatedHP = gameroomInfo[0].hpOfPlayer2;
                                                updatedHP = updatedHP - cardSelected2.hpUseForSpell;
                                                gameroomInfo[0].updateAttributes({ hpOfPlayer2: updatedHP });
                                            }
                                        }
                                    }
                                }
                            } else if (ctx.args.data.subAction == "attackWithCard") {
                                let cardSelected;
                                let cardIsLaidDown = false;


                                let cardSelected2;

                                if (player[0].username == JSON.parse(gameroomInfo[0].player1).username && gameroomInfo[0].manaOfPlayer1 >= cardHelper.fullCardInfo(ctx.args.data.selectedCard).manaCost / 2) {
                                    for (let i = 0; i < gameroomInfo[0].usedCardsPlayer1.length; i++) {
                                        usedCardsPlayer1[i] = gameroomInfo[0].usedCardsPlayer1[i];
                                    }
                                    //checks if card is laid down
                                    if (player[0].username == JSON.parse(gameroomInfo[0].player1).username) {
                                        let isCardPlayed = false;
                                        for (let i = 0; i < gameroomInfo[0].laidCardsPlayer1.length; i++) {
                                            if (gameroomInfo[0].laidCardsPlayer1[i].nameOfCard == ctx.args.data.selectedCard) {
                                                for (let x = 0; x < gameroomInfo[0].usedCardsPlayer1.length; x++) {
                                                    if (gameroomInfo[0].usedCardsPlayer1[x] && ctx.args.data.selectedCard == gameroomInfo[0].usedCardsPlayer1[x].nameOfCard) {
                                                        isCardPlayed = true;
                                                        console.log("card has already been palyed : " + gameroomInfo[0].usedCardsPlayer1[x]);
                                                    }
                                                }
                                                if (!isCardPlayed) {
                                                    cardSelected = gameroomInfo[0].laidCardsPlayer1[i];
                                                    cardIsLaidDown = true;
                                                    break;
                                                }
                                            }
                                        }
                                    } 
                                    if (cardIsLaidDown) {
                                        if (ctx.args.data.target != JSON.parse(gameroomInfo[0].player2).username && ctx.args.data.target != JSON.parse(gameroomInfo[0].player1).username) {
                                            lastPlayedAction = ["attackWithCard", ctx.args.data.target , ctx.args.data.targetSide , player[0].username, ctx.args.data.selectedCard];
                                            if (ctx.args.data.targetSide == "ennemy") {
                                                for (let i = 0; i < gameroomInfo[0].laidCardsPlayer2.length; i++) {
                                                    if (ctx.args.data.target == gameroomInfo[0].laidCardsPlayer2[i].nameOfCard) {
                                                        let updatedCardArray = gameroomInfo[0].laidCardsPlayer2;
                                                        updatedCardArray[i].hp = updatedCardArray[i].hp + cardSelected.attack;
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                                        updatedMana = updatedMana - cardSelected.manaCost / 2;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                                        usedCardsPlayer1.push(cardSelected);
                                                        gameroomInfo[0].updateAttributes({ usedCardsPlayer1: usedCardsPlayer1 });
                                                        break;
                                                    }
                                                }
                                            } else if (ctx.args.data.targetSide == "friend") {
                                                for (let i = 0; i < gameroomInfo[0].laidCardsPlayer1.length; i++) {
                                                    if (ctx.args.data.target == gameroomInfo[0].laidCardsPlayer1[i].nameOfCard) {
                                                        let updatedCardArray = gameroomInfo[0].laidCardsPlayer1;
                                                        updatedCardArray[i].hp = updatedCardArray[i].hp + cardSelected.attack;
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                                        updatedMana = updatedMana - cardSelected.manaCost / 2;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                                        usedCardsPlayer1.push(cardSelected);
                                                        gameroomInfo[0].updateAttributes({ usedCardsPlayer1: usedCardsPlayer1 });
                                                        break;
                                                    }
                                                }
                                            }
                                        } else if (ctx.args.data.target == JSON.parse(gameroomInfo[0].player1).username) {
                                            lastPlayedAction = ["attackWithCard", ctx.args.data.target , ctx.args.data.targetSide , player[0].username,ctx.args.data.selectedCard];
                                            let updatedPlayer1HP = gameroomInfo[0].hpOfPlayer1;
                                            updatedPlayer1HP = updatedPlayer1HP + cardSelected.attack;
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer1: updatedPlayer1HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                            updatedMana = updatedMana - cardSelected.manaCost / 2;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                            usedCardsPlayer1.push(cardSelected);
                                            gameroomInfo[0].updateAttributes({ usedCardsPlayer1: usedCardsPlayer1 });
                                        } else if (ctx.args.data.target == JSON.parse(gameroomInfo[0].player2).username) {
                                            lastPlayedAction = ["attackWithCard", ctx.args.data.target , ctx.args.data.targetSide , player[0].username,ctx.args.data.selectedCard];
                                            let updatedPlayer2HP = gameroomInfo[0].hpOfPlayer2;
                                            updatedPlayer2HP = updatedPlayer2HP + cardSelected.attack;
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer2: updatedPlayer2HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer1;
                                            updatedMana = updatedMana - cardSelected.manaCost / 2;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer1: updatedMana });
                                            usedCardsPlayer1.push(cardSelected);
                                            gameroomInfo[0].updateAttributes({ usedCardsPlayer1: usedCardsPlayer1 });
                                        }
                                    }
                                } else if (player[0].username == JSON.parse(gameroomInfo[0].player2).username && gameroomInfo[0].manaOfPlayer2 >= cardHelper.fullCardInfo(ctx.args.data.selectedCard).manaCost / 2) {
                                    for (let i = 0; i < gameroomInfo[0].usedCardsPlayer2.length; i++) {
                                        usedCardsPlayer2[i] = gameroomInfo[0].usedCardsPlayer2[i];
                                    }
                                    if (player[0].username == JSON.parse(gameroomInfo[0].player2).username) {
                                        let isCardPlayed = false;
                                        for (let i = 0; i < gameroomInfo[0].laidCardsPlayer2.length; i++) {
                                            if (gameroomInfo[0].laidCardsPlayer2[i].nameOfCard == ctx.args.data.selectedCard) {
                                                for (let x = 0; x < gameroomInfo[0].usedCardsPlayer2.length; x++) {
                                                    if (gameroomInfo[0].usedCardsPlayer2[x] && ctx.args.data.selectedCard == gameroomInfo[0].usedCardsPlayer2[x].nameOfCard) {
                                                        console.log("card has already been palyed : " + gameroomInfo[0].usedCardsPlayer2[x]);
                                                        isCardPlayed = true;
                                                    }
                                                }
                                                if (!isCardPlayed) {
                                                    cardSelected2 = gameroomInfo[0].laidCardsPlayer2[i];
                                                    cardIsLaidDown = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    //checks if card is laid down
                                    if (cardIsLaidDown) {
                                        if (ctx.args.data.target != JSON.parse(gameroomInfo[0].player2).username && ctx.args.data.target != JSON.parse(gameroomInfo[0].player1).username) {
                                            lastPlayedAction = ["attackWithCard", ctx.args.data.target , ctx.args.data.targetSide , player[0].username,ctx.args.data.selectedCard];
                                            if (ctx.args.data.targetSide == "ennemy") {
                                                for (let i = 0; i < gameroomInfo[0].laidCardsPlayer1.length; i++) {
                                                    if (ctx.args.data.target == gameroomInfo[0].laidCardsPlayer1[i].nameOfCard) {
                                                        let updatedCardArray = gameroomInfo[0].laidCardsPlayer1;
                                                        updatedCardArray[i].hp = updatedCardArray[i].hp + cardSelected2.attack;
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                                        updatedMana = updatedMana - cardSelected2.manaCost / 2;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                                        usedCardsPlayer2.push(cardSelected2);
                                                        gameroomInfo[0].updateAttributes({ usedCardsPlayer2: usedCardsPlayer2 });
                                                        break;
                                                    }
                                                }
                                            } else if (ctx.args.data.targetSide == "friend") {
                                                for (let i = 0; i < gameroomInfo[0].laidCardsPlayer1.length; i++) {
                                                    if (ctx.args.data.target == gameroomInfo[0].laidCardsPlayer2[i].nameOfCard) {
                                                        let updatedCardArray = gameroomInfo[0].laidCardsPlayer2;
                                                        updatedCardArray[i].hp = updatedCardArray[i].hp + cardSelected2.attack;
                                                        gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedCardArray });
                                                        let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                                        updatedMana = updatedMana - cardSelected2.manaCost / 2;
                                                        gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                                        usedCardsPlayer2.push(cardSelected2);
                                                        gameroomInfo[0].updateAttributes({ usedCardsPlayer2: usedCardsPlayer2 });
                                                        break;
                                                    }
                                                }
                                            }
                                        } else if (ctx.args.data.target == JSON.parse(gameroomInfo[0].player1).username) {
                                            lastPlayedAction = ["attackWithCard", ctx.args.data.target , ctx.args.data.targetSide , player[0].username,ctx.args.data.selectedCard];
                                            let updatedPlayer1HP = gameroomInfo[0].hpOfPlayer1;
                                            updatedPlayer1HP = updatedPlayer1HP + cardSelected2.attack;
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer1: updatedPlayer1HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                            updatedMana = updatedMana - cardSelected2.manaCost / 2;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                            usedCardsPlayer2.push(cardSelected2);
                                            gameroomInfo[0].updateAttributes({ usedCardsPlayer2: usedCardsPlayer2 });
                                        } else if (ctx.args.data.target == JSON.parse(gameroomInfo[0].player2).username) {
                                            lastPlayedAction = ["attackWithCard", ctx.args.data.target , ctx.args.data.targetSide , player[0].username,ctx.args.data.selectedCard];
                                            let updatedPlayer2HP = gameroomInfo[0].hpOfPlayer2;
                                            updatedPlayer2HP = updatedPlayer2HP + cardSelected2.attack;
                                            gameroomInfo[0].updateAttributes({ hpOfPlayer2: updatedPlayer2HP });
                                            let updatedMana = gameroomInfo[0].manaOfPlayer2;
                                            updatedMana = updatedMana - cardSelected2.manaCost / 2;
                                            gameroomInfo[0].updateAttributes({ manaOfPlayer2: updatedMana });
                                            usedCardsPlayer2.push(cardSelected2);
                                            gameroomInfo[0].updateAttributes({ usedCardsPlayer2: usedCardsPlayer2 });
                                        }
                                    }
                                }
                            }

                            //last play property, for cool effects in front-end
                            gameroomInfo[0].updateAttributes({ lastPlay: lastPlayedAction });
                            //change turn, for player turn rotation (timer)
                            //check hp of all cards and remove cards if hp too low
                            for (let i = 0; i < gameroomInfo[0].laidCardsPlayer1.length; i++) {
                                if (gameroomInfo[0].laidCardsPlayer1[i].hp < 1) {
                                    let updatedLaidCardOfPlayer = gameroomInfo[0].laidCardsPlayer1;
                                    updatedLaidCardOfPlayer.splice(i, 1);
                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer1: updatedLaidCardOfPlayer });
                                }
                            }
                            for (let i = 0; i < gameroomInfo[0].laidCardsPlayer2.length; i++) {
                                if (gameroomInfo[0].laidCardsPlayer2[i].hp < 1) {
                                    let updatedLaidCardOfPlayer = gameroomInfo[0].laidCardsPlayer2;
                                    updatedLaidCardOfPlayer.splice(i, 1);
                                    gameroomInfo[0].updateAttributes({ laidCardsPlayer2: updatedLaidCardOfPlayer });
                                }
                            }
                            //check hp of two players and declare winner
                            if (gameroomInfo[0].hpOfPlayer2 <= 0) {
                                gameroomInfo[0].updateAttributes({ theWinner: JSON.parse(gameroomInfo[0].player1).username }, (err, player) => { });
                                Gameroom.app.models.player.find({ where: { username: JSON.parse(gameroomInfo[0].player1).username } }, function (err, player) {
                                    player[0].updateAttributes({ gamesPlayed: player[0].gamesPlayed + 1 }, (err, success) => { });
                                    player[0].updateAttributes({ wins: player[0].wins + 1 }, (err, success) => { });
                                    player[0].updateAttributes({ cash: player[0].cash + 420 }, (err, instance) => { });
                                    player[0].updateAttributes({ isCurrentlyPlaying: false }, (err, instance) => { });
                                    player[0].updateAttributes({ gameroomId: "Finished" }, (err, instance) => { });
                                    player[0].updateAttributes({ cards: [] });
                                })
                                Gameroom.app.models.player.find({ where: { username: JSON.parse(gameroomInfo[0].player2).username } }, function (err, player2) {
                                    player2[0].updateAttributes({ gamesPlayed: player2[0].gamesPlayed + 1 }, (err, success) => { });
                                    player2[0].updateAttributes({ losses: player2[0].losses + 1 }, (err, success) => { });
                                    player2[0].updateAttributes({ isCurrentlyPlaying: false }, (err, instance) => { });
                                    player2[0].updateAttributes({ gameroomId: "Finished" }, (err, instance) => { });
                                    player2[0].updateAttributes({ cards: [] });
                                })
                            } else if (gameroomInfo[0].hpOfPlayer1 <= 0) {
                                gameroomInfo[0].updateAttributes({ theWinner: JSON.parse(gameroomInfo[0].player2).username }, (err, player) => { });
                                Gameroom.app.models.player.find({ where: { username: JSON.parse(gameroomInfo[0].player2).username } }, function (err, player2) {
                                    player2[0].updateAttributes({ gamesPlayed: player2[0].gamesPlayed + 1 }, (err, success) => { });
                                    player2[0].updateAttributes({ wins: player2[0].wins + 1 }, (err, success) => { });
                                    player2[0].updateAttributes({ cash: player2[0].cash + 420 }, (err, instance) => { });
                                    player2[0].updateAttributes({ isCurrentlyPlaying: false }, (err, instance) => { });
                                    player2[0].updateAttributes({ gameroomId: "Finished" }, (err, instance) => { });
                                    player2[0].updateAttributes({ cards: [] });
                                })
                                Gameroom.app.models.player.find({ where: { username: JSON.parse(gameroomInfo[0].player1).username } }, function (err, player) {
                                    player[0].updateAttributes({ gamesPlayed: player[0].gamesPlayed + 1 }, (err, success) => { });
                                    player[0].updateAttributes({ losses: player[0].losses + 1 }, (err, success) => { });
                                    player[0].updateAttributes({ isCurrentlyPlaying: false }, (err, instance) => { });
                                    player[0].updateAttributes({ gameroomId: "Finished" }, (err, instance) => { });
                                    player[0].updateAttributes({ cards: [] });
                                })
                            }

                            //delete gameroom after game is over
                            /*if (gameroomInfo[0].theWinner == JSON.parse(gameroomInfo[0].player1).username || gameroomInfo[0].theWinner == JSON.parse(gameroomInfo[0].player2).username) {
                                gameroomInfo[0].delete();
                            } */
                        }

                        let gameroomActions = {
                            "hpOfPlayer": gameroomInfo[0].hpOfPlayer1,
                            "hpOfEnnemy": gameroomInfo[0].hpOfPlayer2,
                            "manaOfPlayer": gameroomInfo[0].manaOfPlayer1,
                            "manaOfEnnemy": gameroomInfo[0].manaOfPlayer2,
                            "laidCardsOfPlayer": gameroomInfo[0].laidCardsPlayer1,
                            "laidCardsOfEnnemy": gameroomInfo[0].laidCardsPlayer2,
                            "heroOfPlayer": gameroomInfo[0].heroOfPlayer1,
                            "heroOfEnnemy": gameroomInfo[0].heroOfPlayer2,
                            "whosTurn": gameroomInfo[0].whosTurn,
                            "lastPlay": gameroomInfo[0].lastPlay,
                            "deckOfPlayer": gameroomInfo[0].deckOfPlayer1,
                            "maxHpOfPlayer": heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).hp,
                            "maxHpOfEnnemy": heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).hp,
                            "maxManaOfPlayer": heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).mana,
                            "maxManaOfEnnemy": heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).mana,
                            "abilityOfPlayer": heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).ability,
                            "costOfManaAbility": heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).costOfManaSpell,
                            "descOfAbility": heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).abilityDesc,
                            "nameOfPlayer": JSON.parse(gameroomInfo[0].player1).username,
                            "nameOfEnnemy": JSON.parse(gameroomInfo[0].player2).username,
                            "theWinner": gameroomInfo[0].theWinner
                        };
                        let gameroomActions2 = {
                            "hpOfEnnemy": gameroomInfo[0].hpOfPlayer1,
                            "hpOfPlayer": gameroomInfo[0].hpOfPlayer2,
                            "manaOfEnnemy": gameroomInfo[0].manaOfPlayer1,
                            "manaOfPlayer": gameroomInfo[0].manaOfPlayer2,
                            "laidCardsOfEnnemy": gameroomInfo[0].laidCardsPlayer1,
                            "laidCardsOfPlayer": gameroomInfo[0].laidCardsPlayer2,
                            "heroOfEnnemy": gameroomInfo[0].heroOfPlayer1,
                            "heroOfPlayer": gameroomInfo[0].heroOfPlayer2,
                            "whosTurn": gameroomInfo[0].whosTurn,
                            "lastPlay": gameroomInfo[0].lastPlay,
                            "deckOfPlayer": gameroomInfo[0].deckOfPlayer2,
                            "maxHpOfPlayer": heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).hp,
                            "maxHpOfEnnemy": heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).hp,
                            "maxManaOfPlayer": heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).mana,
                            "maxManaOfEnnemy": heroHelper.getHero(gameroomInfo[0].heroOfPlayer1).mana,
                            "abilityOfPlayer": heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).ability,
                            "costOfManaAbility": heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).costOfManaSpell,
                            "descOfAbility": heroHelper.getHero(gameroomInfo[0].heroOfPlayer2).abilityDesc,
                            "nameOfPlayer": JSON.parse(gameroomInfo[0].player2).username,
                            "nameOfEnnemy": JSON.parse(gameroomInfo[0].player1).username,
                            "theWinner": gameroomInfo[0].theWinner
                        };
                        let player1Socket = socketConnections[gameroomInfo[0].player1SocketIndex].socket;
                        player1Socket.emit('stream' + JSON.parse(gameroomInfo[0].player1).username, gameroomActions);
                        let player2Socket = socketConnections[gameroomInfo[0].player2SocketIndex].socket;
                        player2Socket.emit('stream' + JSON.parse(gameroomInfo[0].player2).username, gameroomActions2);
                        //delete sockets of players after game is over
                        if(gameroomInfo[0].theWinner != undefined){
                            for(let i = 0; i < socketConnections.length; i++){
                                if(JSON.parse(gameroomInfo[0].player1).username == socketConnections[i].username){
                                    socketConnections.splice(i,1);
                                }else if(JSON.parse(gameroomInfo[0].player2).username == socketConnections[i].username){
                                    socketConnections.splice(i,1);
                                }
                            }
                        }
                    });
                })
            })
        }
        next();
    });

    //sockets
    io.on('connect', (socket) => {
        console.log("player con");
        let gameroomId;
        let accessToken;
        let username;
        socket.on('stream', function (data) {
            console.log(data);
            gameroomId = data.gameroomId;
            accessToken = data.accessToken;
            username = data.username;
            let socketOBJ = {
                username: username,
                socket: socket
            }
            socketConnections.push(socketOBJ);
            Gameroom.app.models.gameroom.find({ where: { id: gameroomId } }, function (err, gameroom) {
                let userId;
                Gameroom.app.models.AccessToken.find({ where: { id: accessToken } }, function (err, instance) {
                    userId = instance[0].userId;

                    Gameroom.app.models.player.find({ where: { id: userId } }, function (err, player) {
                        if (player[0].username == JSON.parse(gameroom[0].player1).username) {
                            console.log("created socket 1");
                            gameroom[0].updateAttributes({ player1SocketIndex: socketConnections.length - 1 });
                        } else if (player[0].username == JSON.parse(gameroom[0].player2).username) {
                            console.log("created socket 2");
                            gameroom[0].updateAttributes({ player2SocketIndex: socketConnections.length - 1 });
                        }
                    })
                })
            })
        });

    });

    //GAME VIEW
    Gameroom.afterRemote("findById", (ctx, model, next) => {
        Gameroom.app.models.gameroom.find({ where: { id: ctx.args.id } }, function (err, gameroom) {
            let userId;
            Gameroom.app.models.AccessToken.find({ where: { id: ctx.req.query.access_token } }, function (err, instance) {
                userId = instance[0].userId;

                Gameroom.app.models.player.find({ where: { id: userId } }, function (err, player) {
                    if (player[0].username == JSON.parse(gameroom[0].player1).username) {
                        ctx.result = {
                            "hpOfPlayer": gameroom[0].hpOfPlayer1,
                            "hpOfEnnemy": gameroom[0].hpOfPlayer2,
                            "manaOfPlayer": gameroom[0].manaOfPlayer1,
                            "manaOfEnnemy": gameroom[0].manaOfPlayer2,
                            "laidCardsOfPlayer": gameroom[0].laidCardsPlayer1,
                            "laidCardsOfEnnemy": gameroom[0].laidCardsPlayer2,
                            "heroOfPlayer": gameroom[0].heroOfPlayer1,
                            "heroOfEnnemy": gameroom[0].heroOfPlayer2,
                            "whosTurn": gameroom[0].whosTurn,
                            "lastPlay": gameroom[0].lastPlay,
                            "deckOfPlayer": gameroom[0].deckOfPlayer1,
                            "maxHpOfPlayer": heroHelper.getHero(gameroom[0].heroOfPlayer1).hp,
                            "maxHpOfEnnemy": heroHelper.getHero(gameroom[0].heroOfPlayer2).hp,
                            "maxManaOfPlayer": heroHelper.getHero(gameroom[0].heroOfPlayer1).mana,
                            "maxManaOfEnnemy": heroHelper.getHero(gameroom[0].heroOfPlayer2).mana,
                            "abilityOfPlayer": heroHelper.getHero(gameroom[0].heroOfPlayer1).ability,
                            "costOfManaAbility": heroHelper.getHero(gameroom[0].heroOfPlayer1).costOfManaSpell,
                            "descOfAbility": heroHelper.getHero(gameroom[0].heroOfPlayer1).abilityDesc,
                            "nameOfPlayer": JSON.parse(gameroom[0].player1).username,
                            "nameOfEnnemy": JSON.parse(gameroom[0].player2).username,
                            "theWinner": gameroom[0].theWinner
                        };
                    } else if (player[0].username == JSON.parse(gameroom[0].player2).username) {
                        ctx.result = {
                            "hpOfEnnemy": gameroom[0].hpOfPlayer1,
                            "hpOfPlayer": gameroom[0].hpOfPlayer2,
                            "manaOfEnnemy": gameroom[0].manaOfPlayer1,
                            "manaOfPlayer": gameroom[0].manaOfPlayer2,
                            "laidCardsOfEnnemy": gameroom[0].laidCardsPlayer1,
                            "laidCardsOfPlayer": gameroom[0].laidCardsPlayer2,
                            "heroOfEnnemy": gameroom[0].heroOfPlayer1,
                            "heroOfPlayer": gameroom[0].heroOfPlayer2,
                            "whosTurn": gameroom[0].whosTurn,
                            "lastPlay": gameroom[0].lastPlay,
                            "deckOfPlayer": gameroom[0].deckOfPlayer2,
                            "maxHpOfPlayer": heroHelper.getHero(gameroom[0].heroOfPlayer2).hp,
                            "maxHpOfEnnemy": heroHelper.getHero(gameroom[0].heroOfPlayer1).hp,
                            "maxManaOfPlayer": heroHelper.getHero(gameroom[0].heroOfPlayer2).mana,
                            "maxManaOfEnnemy": heroHelper.getHero(gameroom[0].heroOfPlayer1).mana,
                            "abilityOfPlayer": heroHelper.getHero(gameroom[0].heroOfPlayer2).ability,
                            "costOfManaAbility": heroHelper.getHero(gameroom[0].heroOfPlayer2).costOfManaSpell,
                            "descOfAbility": heroHelper.getHero(gameroom[0].heroOfPlayer2).abilityDesc,
                            "nameOfPlayer": JSON.parse(gameroom[0].player2).username,
                            "nameOfEnnemy": JSON.parse(gameroom[0].player1).username,
                            "theWinner": gameroom[0].theWinner
                        };
                    };
                    next();
                });

            })
        });
    })
};
