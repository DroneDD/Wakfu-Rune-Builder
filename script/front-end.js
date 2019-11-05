$(document).ready(function(){
    //This function allows the user to change the number of available runes on an item
    $("body").on("click", "#item-selection button", function(){
        $("#item-selection button").removeClass("btn-selected");
        $(this).addClass("btn-selected");
        var html = "";
        var runeAmount = $(this).val();

        //Update the Build item number of runes
        var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});
        item.Slots = runeAmount;
        //item.Runes = [];

        while (item.Runes.length != runeAmount){
            if (item.Runes.length > runeAmount){
                item.Runes.pop();
            }
            else{
                item.Runes.push({
                    RuneType: 1,
                    RuneEffectID: 0,
                    RuneLevel: 0
                });
            }
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
        if(target.closest("#level-dropdown").length == 0){
            $('#level-dropdown-content').hide();
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
    $("body").on("keydown", "#item-select", function(e){
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

            ItemBuild.SelectedItemType = itemType;

            LoadItem();
        }
    });

    //this function allows the user to open the level dropdown menu
    $("body").on("click", "#level-dropdown", function(){
        if ($("#level-dropdown-content").is(":visible")){
            $("#level-dropdown-content").hide();
        }
        else{
            $("#level-dropdown-content").show();
        }
    });

    //This function allows the user to change the level of the item in the dropdown
    $("body").on("click", "#level-dropdown-content div", function(){
        //$('#level-dropdown-content').hide();
        var level = $(this).attr("value");
        $("#level-dropdown").attr("value", function() {return level;});
        $("#level-dropdown > p").text(level);

        $("#level-dropdown").focus();

        ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType}).ItemLevel = level;

        LoadItem();
    });

    //This function allows the user to quickly change the selected item by pressing up and down on their keyboard
    $("body").on("keydown", "#level-dropdown", function(e){
        if (e.keyCode == 38 || e.keyCode == 40) {
            $('#level-dropdown-content').hide();
            var level = +$("#level-dropdown > p").text();
            if (e.keyCode == 38){
                if (level <= 20) { return; }
                level -= 15;
            }
            if (e.keyCode == 40){
                if (level >= 200) { return; }
                level += 15;
            }
            $("#level-dropdown").attr("value", function() {return level;});
            $("#level-dropdown > p").text(level);

            ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType}).ItemLevel = level;

            LoadItem();
        }
    });

    //This function allows the user to select a rune by clicking it once to see it's potential values
    $("body").on("click", ".emplacement", function(){
        $('.selection').hide();
        $(".rune-selected").removeClass("rune-selected");

        ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType}).SelectedRuneIndex = $(this).attr("value");

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

        var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});

        //Change the rune type and reset its effects
        item.Runes[emplacement.attr("value")].RuneType = +$(this).attr("value");
        item.Runes[emplacement.attr("value")].RuneEffectID = 0;
        item.Runes[emplacement.attr("value")].RuneLevel = 0;

        //Reset the sublimation
        item.SublimationID = 0;

        BuildRuneSlots();
    });

    //This function allows the user to press the number 1 to 4 on his keyboard to quickly change the pointed rune
    $("body").on("mouseover", ".emplacement", function(){
        var emplacement = $(this);
        $(document).bind("keydown", function(e) {
            if (e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4"){
                var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});

                //Change the rune type and reset its effects
                item.Runes[emplacement.attr("value")].RuneType = +e.key;
                item.Runes[emplacement.attr("value")].RuneEffectID = 0;
                item.Runes[emplacement.attr("value")].RuneLevel = 0;

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
        var SelectedRuneIndex = $(".rune-selected").attr("value");
        var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});
        item.Runes[SelectedRuneIndex].RuneEffectID = effectID;
        item.Runes[SelectedRuneIndex].RuneLevel = 1;

        BuildRuneSlots();
    });

    //This function selects the rune effect
    $("body").on("click", ".effect-level", function(){
        var runeLevel = $(this).attr("value");
        var SelectedRuneIndex = $(".rune-selected").attr("value");
        var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});
        item.Runes[SelectedRuneIndex].RuneLevel = runeLevel;

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
        var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});
        if (item.SublimationID == sublimationID){
            item.SublimationID = 0;
        }
        else {
            item.SublimationID = sublimationID;
        }

        BuildRuneSlots();
    });

    $("body").on("click", "#btn-remove-rune", function (){
        var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});
        var rune = item.Runes[item.SelectedRuneIndex];
        rune.RuneEffectID = 0;
        rune.RuneLevel = 0;

        BuildRuneSlots();
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//------------------------------------------HTML BUILDING CODE BELOW------------------------------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This function builds up to 4 rune slots with the corresponding rune image for the current item
function BuildRuneSlots(reloadSlots = true){
    var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});
    var selectedTab = $(".tab-selected").attr("value");
    var slotID = "#slot-" + item.SelectedRuneIndex;
    if (reloadSlots){
        var html = "";
        for (let i = 0; i < item.Slots; i++){
            var rune = item.Runes[i];
            var effect = GetEffectList(null, null, rune.RuneEffectID);
            var boost = IsEffectBoosted(effect, ItemBuild.SelectedItemType);
            html += "<div class='rune-dropdown'>"
            html += "<div id='slot-" + i.toString() + "' class='emplacement " + GetRuneClass(rune.RuneType) + (rune.RuneEffectID != 0 ? "-filled' title='" + effect.description + ": " + GetEffectValue(effect, rune.RuneLevel, boost) : "") + "' value='" + i + "'>"
            html += "</div>";
            html += BuildRuneSelectorHtml(i);
            html += "</div>";
        }  
    }
    $("#emplacements").html(html);

    if (selectedTab == "1"){
        if ($(slotID).length){
            $(slotID).addClass("rune-selected");
            if (item.Runes[item.SelectedRuneIndex].RuneEffectID != 0)
                LoadItemEffectHandler();
            else
                LoadItemEffects(item.Runes[item.SelectedRuneIndex].RuneType, ItemBuild.SelectedItemType);
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
        var boost = IsEffectBoosted(effect, ItemBuild.SelectedItemType);
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
    var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});
    var rune = item.Runes[item.SelectedRuneIndex];
    var effect = GetEffectList(null, null, rune.RuneEffectID);
    var boost = IsEffectBoosted(effect, ItemBuild.SelectedItemType);

    var html;
    html = "<span style='width:50%;display:inline-block;'>";
    html += "<table class='effect-level-list" + (boost ? " effect-boosted" : "") + "'>";
    html += "<tr style='font-style:normal;color:rgb(199, 199, 199);'><td>Niveau</td><td>Valeur</td></tr>";
    for (let i = 1; i <= 5; i++) {
        html += "<tr class='effect-level" + (rune.RuneLevel == i ? " effect-level-selected" : "") + "' value='" + i + "'>";
        html += "   <td>" + i + "</td>";
        html += "   <td>" + GetEffectValue(effect, i, boost) + "</td>";
        html += "</tr>";
    }
    html += "</table>";

    html += "</span><span style='width:50%;display:inline-block;'>";

    html += "<table class='effect-level-list" + (boost ? " effect-boosted" : "") + "'>";
    html += "<tr style='font-style:normal;color:rgb(199, 199, 199);'><td>Niveau</td><td>Valeur</td></tr>";
    for (let i = 1; i <= 5; i++) {
        html += "<tr class='effect-level" + (rune.RuneLevel == (i + 5) ? " effect-level-selected" : "") + "' value='" + (i + 5) + "'>";
        html += "   <td>" + (i + 5) + "</td>";
        html += "   <td>" + GetEffectValue(effect, (i + 5), boost) + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    html += "</span>";
    html += "<div style='line-height:35px;font-size: 100%;'>" + effect.description + ": " + GetEffectValue(effect, rune.RuneLevel, boost)
    html += "<button id='btn-remove-rune'> Enlever la rune</button>"
    html += "</div>"
    $('#available-effects').html(html);
}

//This function populates and prefills the form with the current Build Item
function LoadItem() {
    var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});
    var slots = item.Slots;

    $("#item-select").attr("value", function() {return ItemBuild.SelectedItemType;});
    $("#item-select div").removeClass();
    $("#item-select div").addClass(GetBoostImages(ItemBuild.SelectedItemType));
    $("#item-select p").text(GetItemTypeName(ItemBuild.SelectedItemType));

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
    var item = ItemBuild.Items.find(function(item) {return item.ItemType == ItemBuild.SelectedItemType});
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

function LoadTotalRows(){
    var html = "";
    var totalEffects = LoadTotalEffects();

    html += "<table id='tbl-total' style='margin-top: 15px;'>";
    html += "   <tr>";
    html += "       <td class='td-total-header'>Description</td>";
    html += "       <td class='td-total-header td-total-value' style='width:60px;'>Total</td>";
    html += "   </tr>";

    $.each(totalEffects, function(i, effect){
        html += "<tr class='total-rows-line'>";
        html += "   <td>" + effect.Description + "</td>";
        html += "   <td class='td-total-value'>" + effect.Total + "</td>";
        html += "</tr>";
    });
    html += "</table>";

    $('#total-rows').html(html);
}

function LoadSelection() {
    $('#main-body').load('html/item-selection.html', function() { LoadItem(); });
    $('footer').load('html/selection-footer.html');
}

function LoadTotals() {
    $('#main-body').load('html/total-effects.html', function() { LoadTotalRows(); });
    $('footer').load('html/total-footer.html');
}