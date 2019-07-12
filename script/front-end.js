$(document).ready(function(){
    //This function allows the user to change the number of available runes on an item
    $("#item-selection button").click(function(){
        $("#item-selection button").removeClass("btn-selected");
        $(this).addClass("btn-selected");
        var html = "";
        for (let i = 0; i < $(this).val(); i++) {
            html += "<div class='rune-selector'>"
            html += "<div id='spot-" + (i + 1).toString() + "' class='emplacement red-rune'>"
            html += "</div>";
            html += BuildRuneSelectorHtml((i + 1));
            html += "</div>";
        }
        $("#emplacements").html(html);
    });

    //this function allows the user to hide the rune selection menu by clicking outside with the left or right click
    $(document).on("click contextmenu", function(event) { 
        target = $(event.target);
        if(!event.target.matches('.emplacement')) {
            $('.selection').hide();
        }        
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

        LoadItemEffects(type, $("#item-select").val());
    });

    //This function allows the user to open the selection menu by double clicking or right clicking a rune
    $("body").on("dblclick contextmenu", ".emplacement", function(){
        $('.selection').hide();
        $(this).parent().find(".selection").show();
    });

    //This function allows the user to choose a rune in the selection menu
    $("body").on("click", ".selection div", function(){
        $('.selection').hide();
        var emplacement = $(this).closest(".rune-selector").find(".emplacement");
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
                LoadItemEffects(type, $("#item-select").val());
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
                    LoadItemEffects(e.key, $("#item-select").val());
                }
            }
        });
    }).on("mouseout", ".emplacement", function(){
        $(document).unbind("keydown");
    });

    $("#item-select").change(function(){
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
            LoadItemEffects(type, $("#item-select").val());
    });

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
    html += "<tr id='table-header'><td style='width:30px;'>Rune</td><td>Description</td><td>Valeurs</td><td>Boost</td></tr>";
    $.each(effects, function(i, effect) {
        html += "<tr class='effect-line'>";
        html += "   <td style='background: url(\"./images/" + GetRuneImage(effect.runeType) + "\") no-repeat center;'></td>";
        html += "   <td>" + effect.description + "</td>";
        html += "   <td>" + GetEffectValue(effect, 1, false) + "-" + GetEffectValue(effect, 10, false) + "</td>";
        if (IsEffectBoosted(effect, $("#item-select").val()))
            html += "   <td>Oui</td>";
        else
            html += "   <td>Non</td>";
        html += "</tr>";
    });
    html += "</table>";

    $('#available-effects').html(html);
}

function BuildBoostImages(){
    
}