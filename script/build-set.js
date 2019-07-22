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
    Slots: 4,
    Runes: []
};
*/

var ItemBuild = {
    SetupName: "",
    Items: []
};

function LoadBaseBuild() {
    ItemBuild.SetupName = "Default";

    for (var i = 0; i < 10; i++) {
        ItemBuild.Items.push({
            ItemType: Math.pow(2, i),
            ItemLevel: 200,
            Slots: 4,
            Runes: []
        });
    }
}