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
    SelectedRuneIndex: 0,
    Runes: []
};
*/

var ItemBuild = {
    SetupName: "",
    SelectedItemType: 1,
    Items: []
};

function LoadBaseBuild(callback) {
    ItemBuild.SetupName = "Default";
    SelectedItemType = 1;

    for (var i = 0; i < 10; i++) {
        ItemBuild.Items.push({
            ItemType: Math.pow(2, i),
            ItemLevel: 200,
            SublimationID: 0, //SublimationID == 0 means nothing selected
            Slots: 4,
            SelectedRuneIndex: 0,
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

function SaveBuild(){
    let fs = require("fs-extra");
    let remote = require('electron').remote;
    let app = remote.app;
    let dialog = remote.dialog;
    let options = {
        title: "Sauvegarder votre build",
        defaultPath: app.getPath('userData') + "\\Builds\\DefaultBuild.wrb",
        filters: [{name: "Fichiers Wakfu-Rune-Builder", extensions: ["wrb"]}]
    };
    fs.ensureDirSync(app.getPath('userData') + "\\Builds\\");
    let path = dialog.showSaveDialog(options);
    if (path){
        if (!path.toLowerCase().endsWith(".wrb")){
            path += ".wrb";
        }
        ItemBuild.SetupName = path.substr(0, path.length - 4);
        fs.writeFileSync(path, JSON.stringify(ItemBuild));
    }
}

function LoadBuild(){
    let fs = require("fs-extra");
    let remote = require('electron').remote;
    let app = remote.app;
    let dialog = remote.dialog;
    let options = {
        title: "Sélectionner un build",
        defaultPath: app.getPath('userData') + "\\Builds\\DefaultBuild.wrb",
        filters: [{name: "Fichiers Wakfu-Rune-Builder", extensions: ["wrb"]}]
    };
    fs.ensureDirSync(app.getPath('userData') + "\\Builds\\");
    let path = dialog.showOpenDialog(options);
    if (path && path[0]){
        ItemBuild = JSON.parse(fs.readFileSync(path[0]));
        LoadItem();
    }
}