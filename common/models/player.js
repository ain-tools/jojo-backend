'use strict';
let cardHelper = require('./cardHelper');

module.exports = function (Player) {

    //remove endpoints
    Player.disableRemoteMethodByName("replaceOrCreate", true);
    Player.disableRemoteMethodByName("patchAttributes", true);
    Player.disableRemoteMethodByName("replaceById", true);
    Player.disableRemoteMethodByName("replace", true);
    Player.disableRemoteMethodByName("createChangeStream", true);
    Player.disableRemoteMethodByName("prototype.updateAttributes", true);
    Player.disableRemoteMethodByName("upsertWithWhere", true);
    Player.disableRemoteMethodByName("upsert", true);
    Player.disableRemoteMethodByName("updateAll", true);
    Player.disableRemoteMethodByName("updateAttributes", false);
    Player.disableRemoteMethodByName("find", true);
    Player.disableRemoteMethodByName("findOne", true);
    Player.disableRemoteMethodByName("deleteById", true);
    Player.disableRemoteMethodByName("confirm", true);
    Player.disableRemoteMethodByName("count", true);
    Player.disableRemoteMethodByName("exists", true);
    Player.disableRemoteMethodByName("resetPassword", true);
    Player.disableRemoteMethodByName('__count__accessTokens', false);
    Player.disableRemoteMethodByName('__create__accessTokens', false);
    Player.disableRemoteMethodByName('__delete__accessTokens', false);
    Player.disableRemoteMethodByName('__destroyById__accessTokens', false);
    Player.disableRemoteMethodByName('__findById__accessTokens', false);
    Player.disableRemoteMethodByName('__get__accessTokens', false);
    Player.disableRemoteMethodByName('__updateById__accessTokens', false);

    Player.afterRemote("create",(ctx,model,next)=>{
        model.updateAttributes({ cash: 0,player1: {}, player2: {},heroSelected: "Jotaro",gamesPlayed: 0, wins: 0,losses: 0,standsBought: 0,isCurrentlyPlaying:false,cards:[],stashedCards: ["Crazy Diamond", "Star Platinum", "The Hand", "Echoes", "Heaven's Door", "Harvest", "Stray Cat", "Enigma","Ratt","The Sun","Talking Head","Emperor","Hermit Purple"] }, (err, instance) => { });
        next();
    });

};
