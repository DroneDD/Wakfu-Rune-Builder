var ItemRuneSetup = {
    SetupName: "",
    ItemType: 1,
    ItemLevel: 200,
    Slots: 4,
    Runes: []
};

function GetEffectList(type, itemType, itemLevel){
    var effectList = [];
    effectList.push({runeType: "2", maxValue: 20, description: "Maîtrise Élémentaire", bonus: 144});
    effectList.push({runeType: "1", maxValue: 30, description: "Maîtrise Mêlée", bonus: 3});
    effectList.push({runeType: "1", maxValue: 30, description: "Maîtrise Distance", bonus: 288});
    effectList.push({runeType: "1", maxValue: 30, description: "Maîtrise Monocible", bonus: 129});
    effectList.push({runeType: "1", maxValue: 30, description: "Maîtrise Zone", bonus: 36});
    effectList.push({runeType: "1", maxValue: 40, description: "Maîtrise Berserk", bonus: 36});
    effectList.push({runeType: "3", maxValue: 30, description: "Maîtrise Dos", bonus: 34});
    effectList.push({runeType: "3", maxValue: 30, description: "Maîtrise Critique", bonus: 264});
    effectList.push({runeType: "1", maxValue: 25, description: "Résistance Terre", bonus: 144});
    effectList.push({runeType: "2", maxValue: 25, description: "Résistance Eau", bonus: 24});
    effectList.push({runeType: "2", maxValue: 25, description: "Résistence Air", bonus: 18});
    effectList.push({runeType: "3", maxValue: 25, description: "Résistance Feu", bonus: 48});
    effectList.push({runeType: "2", maxValue: 80, description: "Vie", bonus: 257});
    effectList.push({runeType: "2", maxValue: 40, description: "Soin", bonus: 6});
    effectList.push({runeType: "2", maxValue: 60, description: "Tacle", bonus: 64});
    effectList.push({runeType: "3", maxValue: 60, description: "Esquive", bonus: 64});
    effectList.push({runeType: "3", maxValue: 40, description: "Initiative", bonus: 6});

    if (type != "4")
        effectList = effectList.filter(function(a) {return a.runeType == type});

    effectList.sort(function(a,b){
        var x = IsEffectBoosted(a, itemType);
        var y = IsEffectBoosted(b, itemType);
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
    });

    return effectList;
}

function GetRuneImage(runeType){
    if (runeType == "1"){
        return "red_rune.png";
    }
    if (runeType == "2"){
        return "blue_rune.png";
    }
    if (runeType == "3"){
        return "green_rune.png";
    }
    if (runeType == "4"){
        return "white_rune.png";
    }
}

function GetItemTypeName(itemType){
    if (itemType == 1) {
        return "Casque";
    }
    if (itemType == 2) {
        return "Cape";
    }
    if (itemType == 4) {
        return "Amulette";
    }
    if (itemType == 8) {
        return "Épaulettes";
    }
    if (itemType == 16) {
        return "Plastron";
    }
    if (itemType == 32) {
        return "Ceinture";
    }
    if (itemType == 64) {
        return "Anneau";
    }
    if (itemType == 128) {
        return "Bottes";
    }
    if (itemType == 256) {
        return "Arme";
    }
}

function IsEffectBoosted(effect, itemType) {
    return (effect.bonus & +itemType) == +itemType;
}

function GetItemTypeImage(itemType){
    if (itemType == 1) {
        return "Casque";
    }
    if (itemType == 2) {
        return "Cape";
    }
    if (itemType == 4) {
        return "Amulette";
    }
    if (itemType == 8) {
        return "Épaulettes";
    }
    if (itemType == 16) {
        return "Plastron";
    }
    if (itemType == 32) {
        return "Ceinture";
    }
    if (itemType == 64) {
        return "Anneau";
    }
    if (itemType == 128) {
        return "Bottes";
    }
    if (itemType == 256) {
        return "Arme";
    }
}

function GetBoostImages(effect) {
    //if (effect)
}

function GetEffectValue(effect, runeLevel, boosted){
    var value = 1;
    if (boosted)
        value = 2;
    if (effect.maxValue == 25)
        value *= runeLevel * 2.5; //Resistance increases by a fix 2.5 per level
    else {
        value *= CalcLevelValue((effect.maxValue / 20), runeLevel);
    }

    return -Math.round(-value);
}

function CalcLevelValue(step, level) {
    var val = 0;
    for (let i = 1; i <= level; i++) {
        if (i < 6)
            val += step; //From level 1 to 5, the increase is x1
        else if (i < 7)
            val += step * 2; //At level 6, the increase is x2
        else if (i < 10)
            val += step * 3; //From level 7 to 9, the increase is x3
        else
            val += step * 4; //At level 10, the increase is x4
    }
    return val;
}