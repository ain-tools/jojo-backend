'use strict';

let heroHelper = require('./heroSelection');
let cardHelper = require('./cardHelper');

module.exports = function (Queue) {

    //remove endpoints
    Queue.disableRemoteMethodByName("replaceOrCreate", true);
    Queue.disableRemoteMethodByName("patchAttributes", true);
    Queue.disableRemoteMethodByName("replaceById", true);
    Queue.disableRemoteMethodByName("replace", true);
    Queue.disableRemoteMethodByName("createChangeStream", true);
    Queue.disableRemoteMethodByName("prototype.updateAttributes", true);
    Queue.disableRemoteMethodByName("upsertWithWhere", true);
    Queue.disableRemoteMethodByName("upsert", true);
    Queue.disableRemoteMethodByName("updateAll", true);
    Queue.disableRemoteMethodByName("updateAttributes", false);
    Queue.disableRemoteMethodByName("findById", true);
    Queue.disableRemoteMethodByName("findOne", true);
    Queue.disableRemoteMethodByName("deleteById", true);
    Queue.disableRemoteMethodByName("confirm", true);
    Queue.disableRemoteMethodByName("count", true);
    Queue.disableRemoteMethodByName("exists", true);
    Queue.disableRemoteMethodByName("resetPassword", true);
    Queue.disableRemoteMethodByName('__count__accessTokens', false);
    Queue.disableRemoteMethodByName('__create__accessTokens', false);
    Queue.disableRemoteMethodByName('__delete__accessTokens', false);
    Queue.disableRemoteMethodByName('__destroyById__accessTokens', false);
    Queue.disableRemoteMethodByName('__findById__accessTokens', false);
    Queue.disableRemoteMethodByName('__get__accessTokens', false);
    Queue.disableRemoteMethodByName('__updateById__accessTokens', false);

    let playersQueued = [];

    //check if player found game
    Queue.afterRemote("find", (ctx, model, next) => {
        let userId;
        Queue.app.models.AccessToken.find({ where: { id: ctx.req.query.access_token } }, function (err, instance) {
            userId = instance[0].userId;
            Queue.app.models.player.find({ where: { id: userId } }, function (err, player) {
                if (player[0].gameroomId) {
                    ctx.result = {
                        gameroomId: player[0].gameroomId
                    }
                }
                next();
            })
        })
    })

    //queue to game or cancel queue
    Queue.afterRemote("create", (ctx, model, next) => {
        model.delete();
        let gameroomId;
        if (ctx.args.data.action == "queueForGame") {
            let userId;
            Queue.app.models.AccessToken.find({ where: { id: ctx.req.query.access_token } }, function (err, instance) {
                userId = instance[0].userId;
                Queue.app.models.player.find({ where: { id: userId } }, function (err, player) {
                    if (player[0].isCurrentlyPlaying == false && player[0].cards.length == 12 && heroHelper.getHero(player[0].heroSelected)) {
                        playersQueued.push(player[0].username);
                        player[0].updateAttributes({ isCurrentlyPlaying: true }, (err, success) => { });
                        checkTheQueue(function (gameId) {
                            gameroomId = gameId;
                        });
                        ctx.result = {
                            gameroomId: gameroomId
                        }
                        next();
                    }
                })
            })
        } else if (ctx.args.data.action == "cancelQueue") {
            let userId;
            Queue.app.models.AccessToken.find({ where: { id: ctx.req.query.access_token } }, function (err, instance) {
                userId = instance[0].userId;
                Queue.app.models.player.find({ where: { id: userId } }, function (err, player) {
                    if (player[0].isCurrentlyPlaying == true) {
                        for (let i = 0; i < playersQueued.length; i++) {
                            if (playersQueued[i] == player[0].username && (player[0].gameroomId == undefined || player[0].gameroomId == "Finished")) {
                                playersQueued.splice(i, 1);
                                player[0].updateAttributes({ isCurrentlyPlaying: false }, (err, success) => { });
                                break;
                            }
                        }
                        next();
                    }
                })
            })
        }
    });

    function checkTheQueue(cb) {
        console.log(playersQueued);
        if (playersQueued.length >= 2) {
            for (let i = 0; i <= playersQueued.length; i = i + 2) {
                if (playersQueued[i] && playersQueued[i + 1]) {
                    Queue.app.models.gameroom.create({ action: "createRoom", player1: playersQueued[i], player2: playersQueued[i + 1] }, (err, model) => {
                        
                        //INITIATE A NEW GAME
                        let deckOfPlayer1 = [];
                        let deckOfPlayer2 = [];
                        Queue.app.models.player.find({ where: { username: playersQueued[i] } }, function (err, player) {
                            player[0].updateAttributes({ isCurrentlyPlaying: true }, (err, instance) => { });
                            player[0].updateAttributes({ gameroomId: model.id });
                            let player1 = player[0];
                            for (let i = 0; i < 9; i++) {
                                let randomNumber = Math.floor(Math.random() * player[0].cards.length - 1) + 1;
                                deckOfPlayer1.push(cardHelper.fullCardInfo(player[0].cards[randomNumber]));
                            }
                            model.updateAttributes({ player1: JSON.stringify(player[0]) }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ heroOfPlayer1: player1.heroSelected }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ hpOfPlayer1: heroHelper.getHero(player1.heroSelected).hp }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ manaOfPlayer1: heroHelper.getHero(player1.heroSelected).mana }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ deckOfPlayer1: deckOfPlayer1 }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ whosTurn: player[0].username }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ laidCardsPlayer1: [] }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ usedCardsPlayer1: [] }, (err,instance) =>{console.log(err); });
                        });
                        Queue.app.models.player.find({ where: { username: playersQueued[i + 1] } }, function (err, player) {
                            player[0].updateAttributes({ isCurrentlyPlaying: true }, (err, instance) => { });
                            player[0].updateAttributes({ gameroomId: model.id });
                            let player2 = player[0];
                            for (let i = 0; i < 9; i++) {
                                let randomNumber = Math.floor(Math.random() * player[0].cards.length - 1) + 1;
                                deckOfPlayer2.push(cardHelper.fullCardInfo(player[0].cards[randomNumber]));
                            }
                            model.updateAttributes({ player2: JSON.stringify(player[0]) }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ heroOfPlayer2: player2.heroSelected }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ hpOfPlayer2: heroHelper.getHero(player2.heroSelected).hp }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ manaOfPlayer2: heroHelper.getHero(player2.heroSelected).mana }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ deckOfPlayer2: deckOfPlayer2 }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ laidCardsPlayer2: [] }, (err, instance) => { console.log(err); });
                            model.updateAttributes({ usedCardsPlayer2: [] }, (err,instance) =>{console.log(err); });
                        });
                        playersQueued.splice(i, 1);
                        playersQueued.splice(i, 1);
                        cb(model.id);
                    });
                }
            }
        }
    }

};
