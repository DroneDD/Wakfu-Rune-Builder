/* This is a class example
var RuneSetup = {
    RuneType: 0,
    RuneEffectID: 4,
    RuneLevel: 10
}
*/

/* This is a class example
var ItemRuneSetup = {
    ItemType: 1,
    ItemLevel: 200,
    SublimationID: 1,
    Slots: 4,
    Runes: []
};
*/

var ItemBuild = {
    SetupName: "",
    Items: []
};

function LoadBaseBuild(callback) {
    ItemBuild.SetupName = "Default";

    for (var i = 0; i < 10; i++) {
        ItemBuild.Items.push({
            ItemType: Math.pow(2, i),
            ItemLevel: 200,
            SublimationID: 0, //SublimationID == 0 means nothing selected
            Slots: 4,
            Runes: []
        });
        for (var i2 = 0; i2 < ItemBuild.Items[i].Slots; i2++) {
            ItemBuild.Items[i].Runes.push({
                RuneType: 1,
                RuneEffectID: 0, //RuneEffectID == 0 means nothing selected
                RuneLevel: 0 //RuneLevel == 0 means nothing selected
            });
        }
    }

    callback();
}