$(document).ready(function(){
    //This function allows the user to change the number of available runes on an item
    $("#item-selection button").click(function(){
        $("#item-selection button").removeClass("btn-selected");
        $(this).addClass("btn-selected");
        var html = "";
        for (let i = 0; i < $(this).val(); i++){
            html += "<div class='rune-dropdown'>"
            html += "<div id='spot-" + (i + 1).toString() + "' class='emplacement red-rune'>"
            html += "</div>";
            html += BuildRuneSelectorHtml((i + 1));
            html += "</div>";
        }
        $("#emplacements").html(html);
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

        DropdownChanged();
    });

    //This function allows the user to select a rune by clicking it once to see it's potential values
    $("body").on("click", ".emplacement", function(){
        $('.selection').hide();
        $(".rune-selected").removeClass("rune-selected");
        $(this).addClass("rune-selected");

        //CALL THE FUNCTION TO CHANGE THE DISPLAYED EFFECTS HERE
        var type;
        if ($(this).hasClass("red-rune"))
            type = "1";
        else if ($(this).hasClass("blue-rune"))
            type = "2";
        else if ($(this).hasClass("green-rune"))
            type = "3";
        else
            type = "4";

        LoadItemEffects(type, $("#item-select").attr("value"));
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
        var isSelected = emplacement.hasClass("rune-selected");
        emplacement.removeClass();
        emplacement.addClass("emplacement " + $(this).attr("class"));

        if (isSelected){
            emplacement.addClass("rune-selected");
            var type;
            var selected = $(".rune-selected");
            if (selected.hasClass("red-rune"))
                type = "1";
            else if (selected.hasClass("blue-rune"))
                type = "2";
            else if (selected.hasClass("green-rune"))
                type = "3";
            else if (selected.hasClass("white-rune"))
                type = "4";
            if (type)
                LoadItemEffects(type, $("#item-select").attr("value"));
        }
    });

    //This function allows the user to pressed the number 1 to 4 on his keyboard to quickly change the pointed rune
    $("body").on("mouseover", ".emplacement", function(){
        var emplacement = $(this);
        $(document).bind("keydown", function(e) {
            if (e.key == "1" || e.key == "2" || e.key == "3" || e.key == "4"){
               var selected = emplacement.hasClass("rune-selected");
               emplacement.removeClass();
                if (e.key == "1")
                    emplacement.addClass("emplacement red-rune");
                if (e.key == "2")
                    emplacement.addClass("emplacement blue-rune");
                if (e.key == "3")
                    emplacement.addClass("emplacement green-rune");
                if (e.key == "4")
                    emplacement.addClass("emplacement white-rune");
                if (selected){
                    emplacement.addClass("rune-selected");
                    LoadItemEffects(e.key, $("#item-select").attr("value"));
                }
            }
        });
    }).on("mouseout", ".emplacement", function(){
        $(document).unbind("keydown");
    });

    function DropdownChanged(){
        var type;
        var selected = $(".rune-selected");
        if (selected.hasClass("red-rune"))
            type = "1";
        else if (selected.hasClass("blue-rune"))
            type = "2";
        else if (selected.hasClass("green-rune"))
            type = "3";
        else if (selected.hasClass("white-rune"))
            type = "4";
        if (type)
            LoadItemEffects(type, $("#item-select").attr("value"));
    }

    $("body").on("click", ".effect-line", function(){
        
    });
});

//This function builds the selection menu for every available slot on an item
function BuildRuneSelectorHtml(number) {
    var html = "";
    html += "<div id='selection-" + number.toString() + "' class='selection'>";
    html += "   <div class='red-rune'></div>";
    html += "   <div class='blue-rune'></div>";
    html += "   <div class='green-rune'></div>";
    html += "   <div class='white-rune'></div>";
    html += "</div>";
    return html;
}

//This function loads and displays the list of available values for the selected rune type
function LoadItemEffects(type, itemType) {
    var effects = GetEffectList(type, itemType);
    var html = "<table id='effect-list'>";
    html += "<tr id='table-header'><td style='width:37px;'>Rune</td><td style='width:175px;'>Description</td><td style='width:55px;'>Valeurs</td><td>Boost</td></tr>";
    $.each(effects, function(i, effect) {
        var boost = IsEffectBoosted(effect, $("#item-select").attr("value"));
        html += "<tr class='effect-line" + (boost ? " effect-boosted" : "") + "'>";
        //Rune Image
        html += "   <td style='background: url(\"./images/" + GetRuneImage(effect.runeType) + "\") no-repeat center;'></td>";
        //Effect Description
        html += "   <td>" + effect.description + "</td>";
        //Effect value range
        html += "   <td>" + GetEffectValue(effect, 1, boost) + "-" + GetEffectValue(effect, 10, boost) + "</td>";
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