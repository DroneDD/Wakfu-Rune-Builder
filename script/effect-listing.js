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
    return effect.bonus & itemType;
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

function LoadTotalEffects(){
    var totalEffects = [];
    ItemBuild.Items.forEach(item => {
        item.Runes.forEach(rune => {
            if (rune.RuneEffectID != 0){
                let effect = GetEffectList(null,null,rune.RuneEffectID);
                let boost = IsEffectBoosted(effect, item.ItemType);
                let value = GetEffectValue(effect, rune.RuneLevel, boost);
                var effectTotalValue = totalEffects.filter(function (e){ return e.RuneEffectID == rune.RuneEffectID });
                if (effectTotalValue.length > 0){
                    effectTotalValue[0].Total += value;
                }
                else{
                    totalEffects.push({ RuneEffectID: rune.RuneEffectID, Description: effect.description, Total: value });
                }
            }
        });
    });

    totalEffects.sort(function(a,b){
        var x = a.RuneEffectID;
        var y = b.RuneEffectID;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });

    return totalEffects;
}

//Could make a "data file.json" to avoid hardcoded values, but as it is not a dynamic DB, this is not any different to hardcode it here than in the file - it could be a bit prettier I guess
function GetSublimationList(item, sublimationID) {
    var sublimationList = [];

    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "1", sublimationID: 1, stack: 2, name: "Ruine cyclique", description: "20 % Dommages indirects dans les tours de table pairs."});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "1", sublimationID: 2, stack: 4, name: "Poids plume", description: "Au lancement du combat, par PM au-dessus de 4 :2 % Dommages infligés (24 maximum)."});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "1", sublimationID: 3, stack: 6, name: "Ruine", description: "5 % Dommages indirects."});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "2", sublimationID: 4, stack: 2, name: "Influence du Wakfu", description: "Lorsque le porteur de l'état commence son tour avec tous ses PW (ou toute sa BQ) :10 % Coup Critique (1 tour)."});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "2", sublimationID: 5, stack: 6, name: "Cicatrisation", description: "5 % point de vie (bonus sur le modificateur de PV)."});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "2", sublimationID: 6, stack: 6, name: "Embuscade écartée", description: "4 % Dommages Infligés aux cibles à 2 cases (1 case entre le porteur de l'état et sa cible)."});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "3", sublimationID: 7, stack: 2, name: "Parade offensive", description: "En faisant une parade sur une attaque directe ennemie :4 % Dommages infligés (1 tour).-10% Parade (1 tour)."});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "3", sublimationID: 8, stack: 2, name: "Retour enflammé", description: "Gagne 100 % du niveau en Enflammé en tuant un ennemi (1 activation par tour)."});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "3", sublimationID: 9, stack: 4, name: "Dérobade lente", description: "3 % Parade par tour (max 40)."});
    sublimationList.push({runeType1: "1", runeType2: "1", runeType3: "3", sublimationID: 10, stack: 6, name: "Carnage", description: "Lorsque les PV sont supérieurs à 90% :15 % du niveau en Maîtrise élémentaire."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "1", sublimationID: 11, stack: 2, name: "Opiniâtreté", description: "Après avoir subi une perte de 2 PA :5 Volonté (3 tours)."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "1", sublimationID: 12, stack: 3, name: "Fermeté", description: "Après avoir subi une perte de 3 PA : 10 Volonté (3 tours)."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "1", sublimationID: 13, stack: 6, name: "Expert des armes légères", description: "Si aucun bouclier, ni dague, ni arme à deux mains n'est équipé, en début de combat :25 % du niveau en Maîtrise Élémentaire.2 % Dommages Infligés sur une cible avec de l'Armure."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "2", sublimationID: 14, stack: 2, name: "Carapace", description: "-1 PA.75 Résistance élémentaire."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "2", sublimationID: 15, stack: 2, name: "Tolérance", description: "En fin de tour :50 % des PM non utilisés sont transmis au tour suivant (max 1 PM)."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "2", sublimationID: 16, stack: 2, name: "Vivacité", description: "1 PA.-150 Résistance Élémentaire."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "2", sublimationID: 17, stack: 6, name: "Enveloppe rocheuse", description: "3 % Armure donnée."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "3", sublimationID: 18, stack: 2, name: "Dimensionnalité", description: "Au premier tour du porteur de l'état :1 PW (non-régénérable)."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "3", sublimationID: 19, stack: 4, name: "Loup solitaire", description: "Si aucun allié n'est entre 1 et 4 cases du porteur :2 % Dommages Infligés."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "3", sublimationID: 20, stack: 4, name: "Muraille", description: "En début de combat, 150 % du niveau en Armure."});
    sublimationList.push({runeType1: "1", runeType2: "2", runeType3: "3", sublimationID: 21, stack: 6, name: "Longueur d'armure", description: "4 % Armure donnée sur un allié en ligne et à distance."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "1", sublimationID: 22, stack: 2, name: "Persistance", description: "En fin de tour, si le porteur de l'état a 6 PA ou plus :60 Résistance Élémentaire (2 tours)."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "1", sublimationID: 23, stack: 2, name: "Solidité", description: "Réduit les dommages directs reçus supérieurs à 20 % des PV max de 400 % du niveau (une fois par tour de table)."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "1", sublimationID: 24, stack: 4, name: "Précaution", description: "En terminant son tour avec moins de 50 % de PV :Soin : 5 % des PV manquants."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "1", sublimationID: 25, stack: 6, name: "Contre-attaque", description: "Lorsque le porteur de l'état subit des dommages directs au contact, une fois par tour de l'attaquant :Le porteur de l'état lui inflige des dommages lumière (10 % du niveau)."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "2", sublimationID: 26, stack: 2, name: "Armure lourde", description: "-1 PM.10 % Dommages infligés."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "2", sublimationID: 27, stack: 2, name: "Combat rapproché", description: "-1 Portée.100% du niveau en Tacle et Esquive."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "2", sublimationID: 28, stack: 2, name: "Critique technique", description: "Le premier coup critique du tour inflige 12 % Dommages supplémentaires.Les suivants infligent 6 % Dommages de moins."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "2", sublimationID: 29, stack: 2, name: "Frénésie", description: "-20% Dommages Infligés.En début de tour :10% Dommages Infligés par ennemi touché dans le tour précédent."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "2", sublimationID: 30, stack: 2, name: "Fureur", description: "-15% Dommages Infligés.En début de tour :5% Dommages Infligés par entité touchée dans le tour précédent."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "2", sublimationID: 31, stack: 4, name: "Être sensible", description: "Si deux alliés ou plus sont entre 1 et 4 cases du porteur :2 % Dommages Infligés."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "3", sublimationID: 32, stack: 4, name: "Critique tactique", description: "3 % Dommages critiques infligés si la cible a > 50 % PV.-3 % Dommages critiques infligés si la cible a <= 50 % PV."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "3", sublimationID: 33, stack: 4, name: "Influence lente", description: "1 % Coup Critique par tour (max 30)."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "3", sublimationID: 34, stack: 4, name: "Préparation critique", description: "À chaque coup critique effectué : n+2 Préparation pour le tour suivant (5 activations par tour)."});
    sublimationList.push({runeType1: "1", runeType2: "3", runeType3: "3", sublimationID: 35, stack: 6, name: "Critique Berserk", description: "Lorsque les PV sont inférieurs à 50 % :5 % Coup Critique."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "1", sublimationID: 36, stack: 4, name: "Pied ferme", description: "Finir son tour au contact d'un ennemi lui applique -5 % Soins réalisés (1 tour)."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "1", sublimationID: 37, stack: 6, name: "Longueur", description: "2 % Dommages Infligés aux cibles alignées et à 2 cases et plus du porteur de l'état."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "1", sublimationID: 38, stack: 6, name: "Sauvegarde", description: "En fin de tour :Les PA non utilisés sont transmis au tour suivant (max 1 PA)."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "2", sublimationID: 39, stack: 2, name: "Aisance", description: "Après avoir subi une perte de 2 PM :5 Volonté (3 tours)."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "2", sublimationID: 40, stack: 3, name: "Légèreté", description: "Après avoir subi une perte de 3 PM :10 Volonté (3 tours)."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "2", sublimationID: 41, stack: 6, name: "Arcanes", description: "Si le porteur de l'état ne possède pas d'armure en fin de tour :50 % du niveau en Armure."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "2", sublimationID: 42, stack: 6, name: "Courage", description: "2 % dommages et soins non-critiques infligés.-2 % dommages et soins critiques infligés."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "3", sublimationID: 43, stack: 4, name: "Manie", description: "Les dommages en mêlée retirent 50 % du niveau en Armure sur la cible.-3 % Armure reçue."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "3", sublimationID: 44, stack: 4, name: "Retour PA", description: "Regagne 1 PA en tuant un ennemi (2 activations par tour)."});
    sublimationList.push({runeType1: "2", runeType2: "1", runeType3: "3", sublimationID: 45, stack: 4, name: "Retour PM", description: "Regagne 1 PM en tuant un ennemi (2 activations par tour)."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "1", sublimationID: 46, stack: 2, name: "Intégrité", description: "En soignant un allié, si cet allié a moins de 15% PV :Soin : 7 % des PV max de la cible."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "1", sublimationID: 47, stack: 4, name: "Wakfu Berserk", description: "Lorsque le porteur de l'état commence son tour avec 50 % ou moins de ses PW (ou de sa BQ) :3 % Dommages critiques infligés (1 tour).100 % du niveau en Armure."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "1", sublimationID: 48, stack: 6, name: "Embuscade", description: "2 % aux Dommages Infligés aux cibles au contact."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "1", sublimationID: 49, stack: 6, name: "Epines", description: "Effectue une Parade donne Préparation +1 Niv. (max 60) (+1 % Dommages Infligés au prochain sort/niveau)."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "2", sublimationID: 50, stack: 2, name: "Arme solide", description: "En infligeant des dommages à un ennemi avec une arme :Cet ennemi réduit ses dommages sur le porteur de l'état de -5 % (1 tour, non-cumulable).Le porteur de l'état doit posséder un bouclier équipé."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "2", sublimationID: 51, stack: 3, name: "Dévastation", description: "1 PW.-30 Volonté (+10 Volonté par niveau)."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "2", sublimationID: 52, stack: 6, name: "Tacle Berserk", description: "Lorsque les PV sont inférieurs à 50 % :10 % Tacle."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "3", sublimationID: 53, stack: 2, name: "Volte-face", description: "Lorsque le porteur de l'état subit des dommages directs au contact, une fois par tour de l'attaquant :Le porteur de l'état se tourne vers lui."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "3", sublimationID: 54, stack: 4, name: "Arme empoisonnée", description: "-20 % Dommages Infligés (+5 % par niveau supplémentaire) avec une Arme.En infligeant des dommages à un ennemi avec une arme à deux mains :Incurable (niveau : coût en PA de l'arme) sur l'ennemi et le porteur de l'état. "});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "3", sublimationID: 55, stack: 6, name: "Dérobade", description: "En début de combat :5 % Parade (1 tour)."});
    sublimationList.push({runeType1: "2", runeType2: "2", runeType3: "3", sublimationID: 56, stack: 6, name: "Esquive Berserk", description: "Lorsque les PV sont inférieurs à 50% :10 % Esquive."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "1", sublimationID: 57, stack: 2, name: "Cyclothymie", description: "Tour pair : 10 Volonté.Tour impair : -10 Volonté."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "1", sublimationID: 58, stack: 2, name: "Théorie de la matière", description: "50 % Coup Critique.-50 % Dommages et Soins."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "1", sublimationID: 59, stack: 4, name: "Neutralité", description: "Au début du premier tour, si les maîtrises secondaires sont <= 0 :8 % Dommages infligés."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "1", sublimationID: 60, stack: 6, name: "Altruisme", description: "2 % Soins réalisés sur un allié en ligne et à distance."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "2", sublimationID: 61, stack: 3, name: "Topologie", description: "Au début du combat :Toute l'Esquive du porteur de l'état est convertie en Armure avec un ratio de 1 pour 1.L'Esquive convertie est perdue."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "2", sublimationID: 62, stack: 6, name: "Parade Berserk", description: "Lorsque les PV sont inférieurs à 50 % :5% Parade."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "2", sublimationID: 63, stack: 6, name: "Relations sociales", description: "2 % Dommages dos en tour pair.2 % Dommages de face en tour impair."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "3", sublimationID: 64, stack: 2, name: "Visibilité", description: "1 Portée.-300 Tacle.-300 Esquive."});
    sublimationList.push({runeType1: "2", runeType2: "3", runeType3: "3", sublimationID: 65, stack: 4, name: "Expert des Coups Critiques", description: "En fin de tour, si un coup critique a été effectué :Soin : 2 % des PV manquants du lanceur."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "1", sublimationID: 66, stack: 2, name: "Focalisation", description: "-15% Dommages Infligés.En début de tour :25% Dommages Infligés si un seul ennemi a été touché au tour précédent."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "1", sublimationID: 67, stack: 2, name: "Vélocité", description: "1 PM.-20% Dommages Infligés."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "1", sublimationID: 68, stack: 6, name: "Main forte", description: "Finir son tour au contact d'un ennemi lui applique -5 % Armure reçue (1 tour)."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "2", sublimationID: 69, stack: 4, name: "Prospérité", description: "3 % aux bonus de caractéristiques reçus.Concerne tous les bonus de caractéristiques (Maîtrises, Résistances, Armure) reçus en combat, lancés par une entité autre que le porteur de l'état.La valeur est toujours arrondie à l'inférieur."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "2", sublimationID: 70, stack: 4, name: "Temporisation", description: "En début de tour, si le joueur n'a pas utilisé de PW le tour précédent :4 % Dommages infligés.4 % Soins réalisés."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "2", sublimationID: 71, stack: 6, name: "Abandon", description: "Au début du premier tour, si les maîtrises secondaires sont <= 0 :1 PW max et 1 Portée.-10 % Armure donnée et reçue."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "2", sublimationID: 72, stack: 6, name: "Endurance", description: "-5 % aux malus de caractéristiques reçus.Concerne tous les malus de caractéristiques (Maîtrises, Résistances, Armure, Coup Critique...) reçus en combat, lancés par une entité autre que le porteur de l'état.La valeur est toujours arrondie à l'inférieur."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "2", sublimationID: 73, stack: 6, name: "Nature", description: "2 % Soins réalisés sur un allié au contact d'un autre allié."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "3", sublimationID: 74, stack: 2, name: "Retour vital", description: "Soin : 10 % des PV manquants du lanceur en tuant un ennemi (2 activations par tour)."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "3", sublimationID: 75, stack: 6, name: "Puits de Vitalité", description: "Augmente de 5 % les Vols de vie réalisés."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "3", sublimationID: 76, stack: 6, name: "Réprobation", description: "-20 Volonté.Réduit de 1 la prochaine perte (+ une perte tous les 2 niveaux) de PA subie.L'effet se réapplique à chaque tour."});
    sublimationList.push({runeType1: "3", runeType2: "1", runeType3: "3", sublimationID: 77, stack: 6, name: "Verrouillage", description: "4 % Dommages infligés aux cibles sans ligne de vue et à 3 cases ou plus.n"});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "1", sublimationID: 78, stack: 4, name: "Revigoration", description: "-10 % Soins réalisés.Le porteur de l'état est soigné de 4 % des soins réalisés sur ses alliés."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "1", sublimationID: 79, stack: 6, name: "Ambition", description: "Au début du premier tour, si les maîtrises secondaires sont <= 0 :5 % Coup critique."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "1", sublimationID: 80, stack: 6, name: "Clameur", description: "-20 Volonté.Réduit de 1 la prochaine perte (+ une perte tous les 2 niveaux) de PM subie.L'effet se réapplique à chaque tour."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "1", sublimationID: 81, stack: 6, name: "Dernier souffle", description: "Lorsque le porteur commence son tour en dessous de 20 % PV :3% Dommages Infligés (1 tour).50 % du niveau en armure."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "1", sublimationID: 82, stack: 6, name: "Ecailles de lune", description: "3 % Armure reçue."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "2", sublimationID: 83, stack: 2, name: "Expert des Parades", description: "-50 Résistance Élémentaire.-15 % Dommages reçus lors d'une Parade."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "2", sublimationID: 84, stack: 2, name: "Secret de la vie", description: "En début de combat :Réduit la Maîtrise Soin à 0.10 % Soins réalisés."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "3", sublimationID: 85, stack: 4, name: "Stupéfaction", description: "En début de combat :5% Coup Critique (1 tour).5 % du niveau en Maîtrise Critique (1 tour)."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "3", sublimationID: 86, stack: 6, name: "Destruction", description: "3 % Dommages de dos.-2 % Dommages de face et de côté."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "3", sublimationID: 87, stack: 6, name: "Influence", description: "3 % Coup Critique."});
    sublimationList.push({runeType1: "3", runeType2: "2", runeType3: "3", sublimationID: 88, stack: 6, name: "Prétention", description: "Au début du premier tour, si les maîtrises secondaires sont <= 0 :5 % Parade."});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "1", sublimationID: 89, stack: 4, name: "Barrière Distance", description: "Réduit les Dommages Distance subis de 50% du niveau, 2 fois par tour."});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "1", sublimationID: 90, stack: 4, name: "Détermination", description: "-15 % Dommages indirects reçus."});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "1", sublimationID: 91, stack: 4, name: "Vol de Tacle", description: "-10 % Dommages Infligés avec une armeEn infligeant des dommages à un ennemi avec une arme à deux mains :Vole 15 % du niveau en Tacle (1 tour, non-cumulable)."});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "2", sublimationID: 92, stack: 4, name: "Barrière Mêlée", description: "Réduit les Dommages Mêlée subis de 50% du niveau, 2 fois par tour."});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "2", sublimationID: 93, stack: 4, name: "Ténacité", description: "En fin de tour, si le porteur de l'état a 2 PA ou plus :25 Résistance Élémentaire (1 tour)."});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "2", sublimationID: 94, stack: 4, name: "Vol d'Esquive", description: "-10 % Dommages Infligés avec une armeEn infligeant des dommages à un ennemi avec une arme à deux mains :Vole 15 % du niveau en Esquive (1 tour, non-cumulable)."});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "3", sublimationID: 95, stack: 4, name: "Puissance brute", description: "En début de combat :-1 PW max.Pour chaque PW dépensé au cours du tour :2 % Dommages infligés (1 tour) (max 30)."});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "3", sublimationID: 96, stack: 4, name: "Ravage", description: "En début de combat :Toutes les Maîtrises : 5 % du niveau.Toutes les Résistances : +3."});
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "3", sublimationID: 97, stack: 6, name: "Ravage secondaire", description: "En début de combat :3 % Coup Critique, 3 % Parade, 3 Volonté."});

    /*
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
    sublimationList.push({runeType1: "3", runeType2: "3", runeType3: "3", sublimationID: 54, stack: 3, name: "Ravage II", description: "Coup Critique, Parade, Volonté : +3"});*/

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