function GetEffectList(type, itemType, itemLevel){
    var effectList = [];
    effectList.push({runeType: "2", runeEffectID: 1,  maxValue: 20, bonus: 144, description: "Maîtrise Élémentaire"});
    effectList.push({runeType: "1", runeEffectID: 2,  maxValue: 30, bonus: 3,   description: "Maîtrise Mêlée"});
    effectList.push({runeType: "1", runeEffectID: 3,  maxValue: 30, bonus: 288, description: "Maîtrise Distance"});
    effectList.push({runeType: "1", runeEffectID: 4,  maxValue: 30, bonus: 129, description: "Maîtrise Monocible"});
    effectList.push({runeType: "1", runeEffectID: 5,  maxValue: 30, bonus: 36,  description: "Maîtrise Zone"});
    effectList.push({runeType: "1", runeEffectID: 6,  maxValue: 40, bonus: 36,  description: "Maîtrise Berserk"});
    effectList.push({runeType: "3", runeEffectID: 7,  maxValue: 30, bonus: 34,  description: "Maîtrise Dos"});
    effectList.push({runeType: "3", runeEffectID: 8,  maxValue: 30, bonus: 264, description: "Maîtrise Critique"});
    effectList.push({runeType: "1", runeEffectID: 9,  maxValue: 25, bonus: 144, description: "Résistance Terre"});
    effectList.push({runeType: "2", runeEffectID: 10, maxValue: 25, bonus: 24,  description: "Résistance Eau"});
    effectList.push({runeType: "2", runeEffectID: 11, maxValue: 25, bonus: 18,  description: "Résistence Air"});
    effectList.push({runeType: "3", runeEffectID: 12, maxValue: 25, bonus: 48,  description: "Résistance Feu"});
    effectList.push({runeType: "2", runeEffectID: 13, maxValue: 80, bonus: 257, description: "Vie"});
    effectList.push({runeType: "2", runeEffectID: 14, maxValue: 40, bonus: 6,   description: "Soin"});
    effectList.push({runeType: "2", runeEffectID: 15, maxValue: 60, bonus: 64,  description: "Tacle"});
    effectList.push({runeType: "3", runeEffectID: 16, maxValue: 60, bonus: 64,  description: "Esquive"});
    effectList.push({runeType: "3", runeEffectID: 17, maxValue: 40, bonus: 6,   description: "Initiative"});

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

function GetBoostImages(itemType) {
    var classes = [];
    if ((itemType & 1) == 1) {
        classes.push("casque");
    }
    if ((itemType & 2) == 2) {
        classes.push("cape");
    }
    if ((itemType & 4) === 4) {
        classes.push("amulette");
    }
    if ((itemType & 8) == 8) {
        classes.push("epaulettes");
    }
    if ((itemType & 16) == 16) {
        classes.push("plastron");
    }
    if ((itemType & 32) == 32) {
        classes.push("ceinture");
    }
    if ((itemType & 64) == 64) {
        classes.push("anneau");
    }
    if ((itemType & 128) == 128) {
        classes.push("bottes");
    }
    if ((itemType & 256) == 256) {
        classes.push("arme");
    }
    return classes;
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