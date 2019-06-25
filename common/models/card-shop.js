'use strict';

let cardHelper = require('./cardHelper');
let heroHelper = require('./heroSelection');

module.exports = function (Cardshop) {

    //remove endpoints
    Cardshop.disableRemoteMethodByName("replaceOrCreate", true);
    Cardshop.disableRemoteMethodByName("patchAttributes", true);
    Cardshop.disableRemoteMethodByName("replaceById", true);
    Cardshop.disableRemoteMethodByName("replace", true);
    Cardshop.disableRemoteMethodByName("createChangeStream", true);
    Cardshop.disableRemoteMethodByName("prototype.updateAttributes", true);
    Cardshop.disableRemoteMethodByName("upsertWithWhere", true);
    Cardshop.disableRemoteMethodByName("upsert", true);
    Cardshop.disableRemoteMethodByName("updateAll", true);
    Cardshop.disableRemoteMethodByName("updateAttributes", false);
    Cardshop.disableRemoteMethodByName("findById", true);
    Cardshop.disableRemoteMethodByName("findOne", true);
    Cardshop.disableRemoteMethodByName("deleteById", true);
    Cardshop.disableRemoteMethodByName("confirm", true);
    Cardshop.disableRemoteMethodByName("count", true);
    Cardshop.disableRemoteMethodByName("exists", true);
    Cardshop.disableRemoteMethodByName("resetPassword", true);
    Cardshop.disableRemoteMethodByName('__count__accessTokens', false);
    Cardshop.disableRemoteMethodByName('__create__accessTokens', false);
    Cardshop.disableRemoteMethodByName('__delete__accessTokens', false);
    Cardshop.disableRemoteMethodByName('__destroyById__accessTokens', false);
    Cardshop.disableRemoteMethodByName('__findById__accessTokens', false);
    Cardshop.disableRemoteMethodByName('__get__accessTokens', false);
    Cardshop.disableRemoteMethodByName('__updateById__accessTokens', false);

    Cardshop.afterRemote("create", (ctx, model, next) => {
        model.delete();
        if (ctx.args.data.action == "buyCard") {
            //card shop
            let userId; 
            Cardshop.app.models.AccessToken.find({where:{id: ctx.req.query.access_token}},function(err,instance){
                userId = instance[0].userId;
                Cardshop.app.models.player.find({where:{id:userId}}, function (err, player) {
                    if (player[0] && player[0].cash >= cardHelper.fullCardInfo(ctx.args.data.cardBought).cardPrice) {
                        let updatedCards = player[0].stashedCards;
                        updatedCards.push(ctx.args.data.cardBought);
                        let updatedCash = player[0].cash;
                        updatedCash = updatedCash - cardHelper.fullCardInfo(ctx.args.data.cardBought).cardPrice;
                        player[0].updateAttributes({ cash: updatedCash, stashedCards: updatedCards, standsBought: player[0].standsBought + 1 });
                        next();
                    } else {
                        let error = new Error();
                        error.message = "Not enough funds.";
                        error.status = "500";
                        next(error);
                    }
                });
            })
        } else if (ctx.args.data.action == "getDeckDetails") {
            let detailedCardsArr = [];
            let userId; 
            Cardshop.app.models.AccessToken.find({where:{id: ctx.req.query.access_token}},function(err,instance){
                userId = instance[0].userId;
                Cardshop.app.models.player.find({where:{id:userId}}, function (err, player) {
                    if(player[0].isCurrentlyPlaying == false && (player[0].gameroomId == undefined || player[0].gameroomId == "Finished")){
                        player[0].updateAttributes({cards:[]});
                    }
                    for (let i = 0; i < player[0].stashedCards.length; i++) {
                        let detailedCard = cardHelper.fullCardInfo(player[0].stashedCards[i]);
                        detailedCardsArr.push(detailedCard);
                    }
                    ctx.result = {
                        detailedCards: detailedCardsArr
                    }
                    next();
                });
            }) 
        }else if(ctx.args.data.action == "selectCardToDeck"){
            let userId;
            let updatedDeck = [];
            let cardNotInDeck = true;
            Cardshop.app.models.AccessToken.find({where:{id: ctx.req.query.access_token}},function(err,instance){
                userId = instance[0].userId;
                Cardshop.app.models.player.find({where:{id:userId}}, function (err, player) {
                    updatedDeck = player[0].cards;
                    for (let i = 0; i < player[0].stashedCards.length; i++) {
                        if(ctx.args.data.selectedCard == player[0].stashedCards[i]){
                            for(let x = 0; x < player[0].cards.length; x++){
                                if(ctx.args.data.selectedCard == player[0].cards[x]){
                                    cardNotInDeck = false;
                                }
                            }
                            break;
                        }
                    }
                    if(player[0].cards.length < 20 && cardNotInDeck){
                        updatedDeck.push(ctx.args.data.selectedCard);
                        player[0].updateAttributes({cards:updatedDeck});
                    }
                    next();
                })
            })
        }else if(ctx.args.data.action == "unselectCard"){
            let userId;
            let updatedDeck = [];
            Cardshop.app.models.AccessToken.find({where:{id: ctx.req.query.access_token}},function(err,instance){
                userId = instance[0].userId;
                Cardshop.app.models.player.find({where:{id:userId}}, function (err, player) {
                    updatedDeck = player[0].cards;
                    for (let i = 0; i < player[0].cards.length; i++) {
                        if(ctx.args.data.selectedCard == player[0].cards[i]){
                            updatedDeck.splice(i,1);
                            break;
                        }
                    }
                    player[0].updateAttributes({cards:updatedDeck});
                    next();
                }) 
            })
        }else if (ctx.args.data.action == "selectHero") {
            let userId;
            Cardshop.app.models.AccessToken.find({ where: { id: ctx.req.query.access_token } }, function (err, instance) {
                userId = instance[0].userId;
                Cardshop.app.models.player.find({ where: { id: userId } }, function (err, player) {
                    player[0].updateAttributes({ heroSelected: ctx.args.data.heroSelected }, (err, instance) => { });
                })
            })
            let heroDetails = heroHelper.getHero(ctx.args.data.heroSelected);
            ctx.result = {
                heroDetails: heroDetails
            }
            next();
        }
    })

    Cardshop.afterRemote("find", (ctx, model, next) => {
        let arrayOfCards = cardHelper.getAllCards();
        ctx.result = {
            cards: arrayOfCards
        }
        next();
    })

};
