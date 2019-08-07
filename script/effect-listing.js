function GetEffectList(type, itemType, effectID){
    var effectList = [];
    effectList.push({runeType: "2", runeEffectID: 1,  maxValue: 20, bonus: 18, description: "Maîtrise Élémentaire"});
    effectList.push({runeType: "1", runeEffectID: 2,  maxValue: 30, bonus: 3,   description: "Maîtrise Mêlée"});
    effectList.push({runeType: "1", runeEffectID: 3,  maxValue: 30, bonus: 544, description: "Maîtrise Distance"});
    effectList.push({runeType: "1", runeEffectID: 4,  maxValue: 30, bonus: 257, description: "Maîtrise Monocible"});
    effectList.push({runeType: "1", runeEffectID: 5,  maxValue: 30, bonus: 36,  description: "Maîtrise Zone"});
    effectList.push({runeType: "1", runeEffectID: 6,  maxValue: 40, bonus: 6,  description: "Maîtrise Berserk"});
    effectList.push({runeType: "3", runeEffectID: 7,  maxValue: 30, bonus: 288,  description: "Maîtrise Dos"});
    effectList.push({runeType: "3", runeEffectID: 8,  maxValue: 30, bonus: 520, description: "Maîtrise Critique"});
    effectList.push({runeType: "1", runeEffectID: 9,  maxValue: 25, bonus: 272, description: "Résistance Terre"});
    effectList.push({runeType: "2", runeEffectID: 10, maxValue: 25, bonus: 24,  description: "Résistance Eau"});
    effectList.push({runeType: "2", runeEffectID: 11, maxValue: 25, bonus: 18,  description: "Résistence Air"});
    effectList.push({runeType: "3", runeEffectID: 12, maxValue: 25, bonus: 48,  description: "Résistance Feu"});
    effectList.push({runeType: "2", runeEffectID: 13, maxValue: 80, bonus: 513, description: "Vie"});
    effectList.push({runeType: "2", runeEffectID: 14, maxValue: 40, bonus: 12,   description: "Soin"});
    effectList.push({runeType: "2", runeEffectID: 15, maxValue: 60, bonus: 192,  description: "Tacle"});
    effectList.push({runeType: "3", runeEffectID: 16, maxValue: 60, bonus: 192,  description: "Esquive"});
    effectList.push({runeType: "3", runeEffectID: 17, maxValue: 40, bonus: 6,   description: "Initiative"});

    if (effectID)
        return effectList.find(function(a) {return a.runeEffectID == effectID});

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

function GetRuneClass(runeType){
    if (runeType == "1"){
        return "red-rune";
    }
    if (runeType == "2"){
        return "blue-rune";
    }
    if (runeType == "3"){
        return "green-rune";
    }
    if (runeType == "4"){
        return "white-rune";
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
        return "Anneau 1";
    }
    if (itemType == 128) {
        return "Anneau 2";
    }
    if (itemType == 256) {
        return "Bottes";
    }
    if (itemType == 512) {
        return "Arme";
    }
}

function IsEffectBoosted(effect, itemType){
    return (effect.bonus & +itemType) == +itemType;
}

function GetBoostImages(itemType){
    var classes = [];
    if ((itemType & 1) == 1) {
        classes.push("casque");
    }
    if ((itemType & 2) == 2) {
        classes.push("cape");
    }
    if ((itemType & 4) == 4) {
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
    if ((itemType & 64) == 64 || (itemType & 128) == 128) {
        classes.push("anneau");
    }
    if ((itemType & 256) == 256) {
        classes.push("bottes");
    }
    if ((itemType & 512) == 512) {
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

function CalcLevelValue(step, level){
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

function GetEffectRange(effect, boosted){
    return GetEffectValue(effect, 1, boosted) + "-" + GetEffectValue(effect, 10, boosted);
}

function GetSublimationList(item, sublimationID) {
    var sublimationList = [];
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "1", sublimationID: 1, stack: 3, name: "Ruine", description: "+10% dommages indirects (dégâts occasionnés par le lanceur en dehors de son tour)"});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "1", sublimationID: 2, stack: 1, name: "Ruine II", description: "+20% Dommages indirects dans les tours de table pairs"});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "2", sublimationID: 3, stack: 3, name: "Cicatrisation", description: "10% PV max"});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "2", sublimationID: 4, stack: 3, name: "Embuscade II", description: "10% Dommages infligés à 2 PO"});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "3", sublimationID: 5, stack: 3, name: "Carnage", description: "40 Maîtrise Élémentaire si les PV sont > 90%"});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "3", sublimationID: 6, stack: 3, name: "Dérobade II", description: "3% Parade par tour (max 40)"});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "1", sublimationID: 7, stack: 1, name: "Fermeté", description: "Après avoir subi une perte de 3 PA : +20 volonté"});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "1", sublimationID: 8, stack: 3, name: "Fermeté II", description: "Après avoir subi une perte de 2 PA : +10 volonté"});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "2", sublimationID: 9, stack: 1, name: "Vivacité", description: "1 PA, -75 Résistance Élémentaire"});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "2", sublimationID: 10, stack: 3, name: "Enveloppe rocheuse", description: "+5% aux Armures données"});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "3", sublimationID: 11, stack: 1, name: "Dimensionnalité", description: "Commence le combat avec +1 PW max non régénérable"});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "3", sublimationID: 12, stack: 2, name: "Muraille", description: "Commence le combat avec 300% du niveau en Armure"});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "1", sublimationID: 13, stack: 1, name: "Solidité", description: "Réduit les dommages directs reçus supérieurs à 20% des PV max, de 500% du niveau"});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "1", sublimationID: 14, stack: 1, name: "Ténacité II", description: "+60 Résistance Élémentaire pour 2 tours si finit son tour avec 6 PA"});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "2", sublimationID: 15, stack: 1, name: "Frénésie", description: "-20% Dommages infligés, 10% Dommages infligés par ennemi touché au début du prochain tour"});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "2", sublimationID: 16, stack: 1, name: "Frénésie II", description: "-15% Dommages infligés, 5% Dommages infligés par entité touchée au début du prochain tour"});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "3", sublimationID: 17, stack: 3, name: "Critique Berserk", description: "Augmente les Coups Critiques de 10% quand les PV sont en dessous de 50%"});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "3", sublimationID: 18, stack: 2, name: "Influence II", description: "+2% Coup Critique par tour (max 40)"});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "1", sublimationID: 19, stack: 3, name: "Sauvegarde", description: "En fin de tour : Transfère un PA non utilisé pour le tour suivant"});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "1", sublimationID: 20, stack: 3, name: "Longueur", description: "+5% aux dommages en ligne à 2 PO ou plus"});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "2", sublimationID: 21, stack: 1, name: "Légèreté", description: "Après avoir subi une perte de 3 PM : +20 volonté"});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "2", sublimationID: 22, stack: 1, name: "Légèreté II", description: "Après avoir subi une perte de 2 PM : +10 volonté"});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "3", sublimationID: 23, stack: 2, name: "Retour", description: "Regagne 1 PA après avoir tué un ennemi"});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "3", sublimationID: 24, stack: 2, name: "Retour II", description: "Regagne 1 PM après avoir tué un ennemi"});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "1", sublimationID: 25, stack: 3, name: "Embuscade", description: "+5% aux Dommages infligés à 1 PO"});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "1", sublimationID: 26, stack: 3, name: "Epines", description: "Effectuer une Parade donne 2 niveaux de Préparation"});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "2", sublimationID: 27, stack: 1, name: "Dévastation", description: "+1 PW, -20 Volonté"});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "2", sublimationID: 28, stack: 3, name: "Tacle Berserk", description: "20% au Tacle quand les PV sont en dessous de 50%"});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "3", sublimationID: 29, stack: 3, name: "Dérobade", description: "+10% Parade le premier tour de jeu"});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "3", sublimationID: 30, stack: 3, name: "Esquive Berserk", description: "20% à l'Esquive quand les PV sont en dessous de 50%"});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "1", sublimationID: 31, stack: 1, name: "Théorie de la matière", description: "-50% Dommages et Soins Réalisés, +100% Coup Critique"});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "1", sublimationID: 32, stack: 1, name: "Cyclothymie", description: "Tour pair : 20 Volonté, tour impair : -20 Volonté"});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "2", sublimationID: 33, stack: 1, name: "Topologie", description: "Au début du combat : toute l'esquive est convertie en Armure. L'esquive convertie est perdue."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "2", sublimationID: 34, stack: 3, name: "Parade Berserk", description: "Augmente la Parade de 10% quand les PV sont en dessous de 50%"});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "3", sublimationID: 35, stack: 1, name: "Visibilité", description: "1 PO, -150 Esquive, -150 Tacle"});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "3", sublimationID: 36, stack: 3, name: "Expert des Coups Critiques", description: "En fin de tour, si un coup critique a été effectué : soigne de 4% des PV manquants"});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "1", sublimationID: 37, stack: 1, name: "Vélocité", description: "1 PM, -10% Dommages Infligés"});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "1", sublimationID: 38, stack: 1, name: "Frénésie III", description: "-15% Dommages infligés, 25% Dommages infligés pour le prochain tour si une seule entité est touchée"});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "2", sublimationID: 39, stack: 3, name: "Endurance", description: "Réduit les malus de caractéristiques reçus de 10%"});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "2", sublimationID: 40, stack: 3, name: "Endurance II", description: "Augmente les bonus de caractéristiques reçus de 5%"});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "3", sublimationID: 41, stack: 3, name: "Réprobation", description: "-20 Volonté, réduit de 1 un retrait PA subi par tour"});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "3", sublimationID: 42, stack: 3, name: "Puits de Vitalité", description: "Augmente l'efficacité des capacités de vol de vie de 10%"});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "1", sublimationID: 43, stack: 3, name: "Ecailles de lune", description: "5% Armures reçues"});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "1", sublimationID: 44, stack: 3, name: "Réprobation II", description: "-20 Volonté, réduit de 1 un retrait PM subi par tour"});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "2", sublimationID: 45, stack: 1, name: "Bonne action", description: "En fin de tour : Transfère un PA non utilisé à l'allié le plus proche"});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "2", sublimationID: 46, stack: 1, name: "Expert des Parades", description: "-50 Résistance Élémentaire, les Parades réduisent les dommages de 15% supplémentaires"});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "3", sublimationID: 47, stack: 2, name: "Stupéfaction", description: "10% Coup Critique le premier tour de jeu"});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "3", sublimationID: 48, stack: 3, name: "Influence", description: "5% Coup Critique"});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "1", sublimationID: 49, stack: 2, name: "Détermination", description: "-15% Dommages indirects reçus (dégâts reçus en dehors du tour du lanceur des dégâts)"});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "1", sublimationID: 50, stack: 3, name: "Barrière Distance", description: "Réduit les Dommages Distance reçus de 50% du niveau, 3 fois par tour"});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "2", sublimationID: 51, stack: 2, name: "Ténacité", description: "+20 Résistance élémentaire pour 1 tour si finit son tour avec 2 PA"});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "2", sublimationID: 52, stack: 3, name: "Barrière Mêlée", description: "Réduit les Dommages Mêlée reçus de 50% du niveau, 3 fois par tour"});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "3", sublimationID: 53, stack: 2, name: "Ravage", description: "Toutes les maîtrises et résistances : +10"});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "3", sublimationID: 54, stack: 3, name: "Ravage II", description: "Coup Critique, Parade, Volonté : +3"});

    if (sublimationID)
        return sublimationList.find(function(a) {return a.sublimationID == sublimationID});

    if (item.Slots == 4){        
        sublimationList = sublimationList.filter(function(a) {
            return ((a.runeType1 == item.Runes[0].RuneType || item.Runes[0].RuneType == 4) && (a.runeType2 == item.Runes[1].RuneType || item.Runes[1].RuneType == 4) && (a.runeType3 == item.Runes[2].RuneType || item.Runes[2].RuneType == 4))
                || ((a.runeType1 == item.Runes[1].RuneType || item.Runes[1].RuneType == 4) && (a.runeType2 == item.Runes[2].RuneType || item.Runes[2].RuneType == 4) && (a.runeType3 == item.Runes[3].RuneType || item.Runes[3].RuneType == 4))
        });
    }

    if (item.Slots == 3){        
        sublimationList = sublimationList.filter(function(a) {
            return ((a.runeType1 == item.Runes[0].RuneType || item.Runes[0].RuneType == 4) && (a.runeType2 == item.Runes[1].RuneType || item.Runes[1].RuneType == 4) && (a.runeType3 == item.Runes[2].RuneType || item.Runes[2].RuneType == 4))
        });
    }

    if (item.Slots <= 2){
        return null;
    }

    return sublimationList;
}