$(document).ready(function(){
    //This function allows the user to change the number of available runes on an item
    $("#item-selection button").click(function(){
        $("#item-selection button").removeClass("btn-selected");
        $(this).addClass("btn-selected");
        var html = "";
        var runeAmount = $(this).val();

        //Update the Build item number of runes
        var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});
        item.Slots = runeAmount;
        item.Runes = [];

        for (let i = 0; i < runeAmount; i++){
            item.Runes.push({
                RuneType: 1,
                RuneEffectID: 0,
                RuneLevel: 0
            });
        }
        BuildRuneSlots();
    });

    //this function allows the user to hide the rune selection menu by clicking outside with the left or right click
    $(document).on("click contextmenu", function(event){ 
        target = $(event.target);
        if(!event.target.matches('.emplacement')) {
            $('.selection').hide();
        }
        if(target.closest("#item-dropdown").length == 0){
            $('#item-dropdown-content').hide();
        }
    });

    //this function allows the user to open the dropdown menu to select the needed item
    $("body").on("click", "#item-select", function(){
        if ($("#item-dropdown-content").is(":visible")){
            $("#item-dropdown-content").hide();
        }
        else{
            $("#item-dropdown-content").show();
        }
    });

    //This function allows the user to change the selected item in the dropdown
    $("body").on("click", "#item-dropdown-content div", function(){
        $('#item-dropdown-content').hide();
        var itemType = $(this).attr("value");
        $("#item-select").attr("value", function() {return itemType;});
        $("#item-select div").removeClass();
        $("#item-select div").addClass(GetBoostImages(itemType));
        $("#item-select p").text(GetItemTypeName(itemType));

        $("#item-select").focus();

        ItemBuild.SelectedItemType = itemType;

        LoadItem();
    });

    //This function allows the user to quickly change the selected item by pressing up and down on their keyboard
    $("#item-select").on("keydown", function(e){
        if (e.keyCode == 38 || e.keyCode == 40) {
            $('#item-dropdown-content').hide();
            var itemType = $(this).attr("value");
            if (e.keyCode == 38){
                if (itemType <= 1) { return; }
                itemType /= 2;
            }
            if (e.keyCode == 40){
                if (itemType >= 512) { return; }
                itemType *= 2;
            }
            $("#item-select").attr("value", function() {return itemType;});
            $("#item-select div").removeClass();
            $("#item-select div").addClass(GetBoostImages(itemType));
            $("#item-select p").text(GetItemTypeName(itemType));

            LoadItem();
        }
    });

    //This function allows the user to select a rune by clicking it once to see it's potential values
    $("body").on("click", ".emplacement", function(){
        $('.selection').hide();
        $(".rune-selected").removeClass("rune-selected");
        $(this).addClass("rune-selected");

        BuildRuneSlots(false);
    });

    //This function allows the user to open the selection menu by double clicking or right clicking a rune
    $("body").on("dblclick contextmenu", ".emplacement", function(){
        $('.selection').hide();
        $(this).parent().find(".selection").show();
    });

    //This function allows the user to choose a rune in the selection menu
    $("body").on("click", ".selection div", function(){
        $('.selection').hide();
        var emplacement = $(this).closest(".rune-dropdown").find(".emplacement");

        var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});

        //Change the rune type and reset its effects
        item.Runes[(emplacement.attr("value") - 1)].RuneType = +$(this).attr("value");
        item.Runes[(emplacement.attr("value") - 1)].RuneEffectID = 0;
        item.Runes[(emplacement.attr("value") - 1)].RuneLevel = 0;

        //Reset the sublimation
        item.SublimationID = 0;

        BuildRuneSlots();
    });

    //This function allows the user to press the number 1 to 4 on his keyboard to quickly change the pointed rune
    $("body").on("mouseover", ".emplacement", function(){
        var emplacement = $(this);
        $(document).bind("keydown", function(e) {
            if (e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4"){
                var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});

                //Change the rune type and reset its effects
                item.Runes[(emplacement.attr("value") - 1)].RuneType = +e.key;
                item.Runes[(emplacement.attr("value") - 1)].RuneEffectID = 0;
                item.Runes[(emplacement.attr("value") - 1)].RuneLevel = 0;

                //Reset the sublimation
                item.SublimationID = 0;

                BuildRuneSlots();
            }
        });
    }).on("mouseout", ".emplacement", function(){
        $(document).unbind("keydown");
    });

    //This function selects the rune effect
    $("body").on("click", ".effect-line", function(){
        var effectID = $(this).attr("value");
        var selectedRuneIndex = $(".rune-selected").attr("value");
        var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});
        item.Runes[(selectedRuneIndex - 1)].RuneEffectID = effectID;
        item.Runes[(selectedRuneIndex - 1)].RuneLevel = 1;

        BuildRuneSlots();
    });

    //This function selects the rune effect
    $("body").on("click", ".effect-level", function(){
        var runeLevel = $(this).attr("value");
        var selectedRuneIndex = $(".rune-selected").attr("value");
        var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});
        item.Runes[(selectedRuneIndex - 1)].RuneLevel = runeLevel;

        BuildRuneSlots();
    });

    //This function changes the selected tab
    $("body").on("click", "#tab-selector div", function(){
        $(".tab-selected").removeClass("tab-selected");
        $(this).addClass("tab-selected");

        BuildRuneSlots();
    });

    //This function selects the rune sublimation
    $("body").on("click", ".sublimation-line", function(){
        var sublimationID = $(this).attr("value");
        var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});
        if (item.SublimationID == sublimationID){
            item.SublimationID = 0;
        }
        else {
            item.SublimationID = sublimationID;
        }

        BuildRuneSlots();
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------HTML BUILDING CODE BELOW------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This function builds up to 4 rune slots with the corresponding rune image for the current item
function BuildRuneSlots(reloadSlots = true){
    var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});
    var selectedTab = $(".tab-selected").attr("value");
    var selectedRune = $(".rune-selected");
    var slotID;
    if (selectedRune.length){
        slotID = "#slot-" + selectedRune.attr("value");
    }
    if (reloadSlots){
        var html = "";
        for (let i = 0; i < item.Slots; i++){
            var rune = item.Runes[i];
            var effect = GetEffectList(null, null, rune.RuneEffectID);
            var boost = IsEffectBoosted(effect, $("#item-select").attr("value"));
            html += "<div class='rune-dropdown'>"
            html += "<div id='slot-" + (i + 1).toString() + "' class='emplacement " + GetRuneClass(rune.RuneType) + (rune.RuneEffectID != 0 ? "-filled' title='" + effect.description + ": " + GetEffectValue(effect, rune.RuneLevel, boost) : "") + "' value='" + (i + 1) + "'>"
            html += "</div>";
            html += BuildRuneSelectorHtml((i + 1));
            html += "</div>";
        }  
    }
    $("#emplacements").html(html);

    if (selectedTab == "1"){
        if ($(slotID).length){
            $(slotID).addClass("rune-selected");
            if (item.Runes[($(slotID).attr("value") - 1)].RuneEffectID != 0)
                LoadItemEffectHandler();
            else
                LoadItemEffects(item.Runes[($(slotID).attr("value") - 1)].RuneType, $("#item-select").attr("value"));
        }
        else { $('#available-effects').html(""); }
    }
    else if (selectedTab == "2"){
        if ($(slotID).length){
            $(slotID).addClass("rune-selected");
        }
        LoadSublimations();
    }

}

//This function builds the selection menu for every available slot on an item
function BuildRuneSelectorHtml(number) {
    var html = "";
    html += "<div id='selection-" + number.toString() + "' class='selection'>";
    html += "   <div class='red-rune' value=1></div>";
    html += "   <div class='blue-rune' value=2></div>";
    html += "   <div class='green-rune' value=3></div>";
    html += "   <div class='white-rune' value=4></div>";
    html += "</div>";
    return html;
}

//This function loads and displays the list of available values for the selected rune type
function LoadItemEffects(runeType, itemType) {
    var effects = GetEffectList(runeType, itemType);
    var html = "<table id='effect-list'>";
    html += "<tr id='table-header'><td style='width:37px;'>Rune</td><td style='width:175px;'>Description</td><td style='width:55px;'>Valeurs</td><td>Boost</td></tr>";
    $.each(effects, function(i, effect) {
        var boost = IsEffectBoosted(effect, $("#item-select").attr("value"));
        html += "<tr class='effect-line" + (boost ? " effect-boosted" : "") + "' value=" + effect.runeEffectID +">";
        //Rune Image
        html += "   <td style='background: url(\"./images/" + GetRuneImage(effect.runeType) + "\") no-repeat center;'></td>";
        //Effect Description
        html += "   <td>" + effect.description + "</td>";
        //Effect value range
        html += "   <td>" + GetEffectRange(effect, boost) + "</td>";
        //Effect boosted items
        var boosts = GetBoostImages(effect.bonus);
        html += "   <td class='image-td'>";
        boosts.forEach(b => {
            html += "   <div class='" + b + "'></div>";
        });
        html += "   </td>";

        html += "</tr>";
    });
    html += "</table>";

    $('#available-effects').html(html);
}

function LoadItemEffectHandler() {
    var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});
    var selectedRune = $(".rune-selected");
    var slotID;
    if (selectedRune.length){
        slotID = selectedRune.attr("value");
    }
    var rune = item.Runes[(slotID - 1)];
    var effect = GetEffectList(null, null, rune.RuneEffectID);
    var boost = IsEffectBoosted(effect, $("#item-select").attr("value"));

    var html;
    html = "<span style='width:50%;display:inline-block;'>";
    html += "<table class='effect-level-list" + (boost ? " effect-boosted" : "") + "'>";
    html += "<tr style='font-style:normal;'><td>Level</td><td>Valeur</td></tr>";
    for (let i = 1; i <= 5; i++) {
        html += "<tr class='effect-level" + (rune.RuneLevel == i ? " effect-level-selected" : "") + "' value='" + i + "'>";
        html += "   <td>" + i + "</td>";
        html += "   <td>" + GetEffectValue(effect, i, boost) + "</td>";
        html += "</tr>";
    }
    html += "</table>";

    html += "</span><span style='width:50%;display:inline-block;'>";

    html += "<table class='effect-level-list" + (boost ? " effect-boosted" : "") + "'>";
    html += "<tr style='font-style:normal;'><td>Level</td><td>Valeur</td></tr>";
    for (let i = 1; i <= 5; i++) {
        html += "<tr class='effect-level" + (rune.RuneLevel == (i + 5) ? " effect-level-selected" : "") + "' value='" + (i + 5) + "'>";
        html += "   <td>" + (i + 5) + "</td>";
        html += "   <td>" + GetEffectValue(effect, (i + 5), boost) + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    html += "</span>";
    html += "<div style='line-height:40px;font-size: 100%;'>" + effect.description + ": " + GetEffectValue(effect, rune.RuneLevel, boost) +"</div>"

    $('#available-effects').html(html);
}

//This function changes the ItemBuild object
function LoadBuild() {
    //THIS IS CURRENTLY UNUSED
    LoadItem();
}

//This function populates and prefills the form with the current Build Item
function LoadItem() {
    var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});
    var slots = item.Slots;

    $("#item-selection button").removeClass("btn-selected");
    if (slots == 1) {
        $("#btn-1").addClass("btn-selected");
    }
    if (slots == 2) {
        $("#btn-2").addClass("btn-selected");
    }
    if (slots == 3) {
        $("#btn-3").addClass("btn-selected");
    }
    if (slots == 4) {
        $("#btn-4").addClass("btn-selected");
    }
    
    BuildRuneSlots();
}

function DisplayTotalEffects() {
    let totalEffects = LoadTotalEffects();
    console.log(totalEffects);
}

function LoadSublimations() {
    var item = ItemBuild.Items.find(function(item) {return item.ItemType == $("#item-select").attr("value")});
    var sublimations = GetSublimationList(item);
    var html = "<table id='sublimation-list'>";
    html += "<tr id='table-header'><td style='width:90px;'>Runes</td><td>Nom</td><td style='width:20px;'>Stack</td></tr>";
    $.each(sublimations, function(i, sublimation) {
        html += "<tr class='sublimation-line" + (item.SublimationID == sublimation.sublimationID ? " sublimation-selected" : "") + "' value=" + sublimation.sublimationID +">";
        html += "   <td colspan=3>";
        //Sublimation Rune Images
        html += "   <div><div class='image-td' style='float:left;'>";
        html += "       <div style='background: url(\"./images/" + GetRuneImage(sublimation.runeType1) + "\") no-repeat center;'></div>";
        html += "       <div style='background: url(\"./images/" + GetRuneImage(sublimation.runeType2) + "\") no-repeat center;'></div>";
        html += "       <div style='background: url(\"./images/" + GetRuneImage(sublimation.runeType3) + "\") no-repeat center;'></div>";
        html += "   </div>";
        //Sublimation Name
        html += "   <div style='display:inline-block;line-height:28px;'>" + sublimation.name + "</div>";
        //Sublimation Stack
        html += "   <div style='display:inline-block;line-height:28px;float:right;width:30px;'>" + sublimation.stack + "</div></div>";
        //Sublimation Description
        html += "   <div style='clear:both;width:100%;text-align:left;'>" + sublimation.description + "</div>";
        html += "   </td'>";

        html += "</tr>";
    });
    html += "</table>";

    $('#available-effects').html(html);
}

function LoadSelection() {
    $('#item-selection').load('html/item-selection.html', function() { LoadItem(); });
    $('footer').load('html/selection-footer.html');
}

function LoadTotals() {
    $('footer').load('html/total-footer.html');
}