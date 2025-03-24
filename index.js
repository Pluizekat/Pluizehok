let tiles = [
    {name: "apple"},
    {name: "apple"},
    {name: "banana"},
    {name: "banana"},
    {name: "passionfruit"},
    {name: "passionfruit"},
    {name: "pineapple"},
    {name: "pineapple"},
    {name: "pear"},
    {name: "pear"},
    {name: "pear"},
    {name: "pear"},
    {name: "pear"},
    {name: "pear"},
    {name: "pear"},
    {name: "pear"},
];

var cardback = "images/cardback.png";

var tile_dict = {};

$(document).ready(function(){

    const template = $( $("#tile-template")[0].innerHTML);

    let openTiles = [];
    let completedTiles = [];

    var timeout = null;

    shuffle(tiles);
    for(var i = 0; i<tiles.length; i++) {
        let copy = template.clone(true);
        let id = "tile-" + i;
        copy.find(".tile").attr("id", id);
        tiles[i].id = id;
        tile_dict[id] = tiles[i];
        copy.find(".card-img-top").attr("src", cardback);
        $("#tile-container").append(copy);
    }

    $(".tile").click(function(){
        if (timeout != null) {
            clearTimeout(timeout);
            closeTiles();
            timeout = null;
        }
        
        var tile = getTile($(this));
        if (canOpen(tile)) {
            openTile(tile);
            checkMemory();
        }
    });

    function checkMemory() {
        if (openTiles.length != 2) {
            return;
        }

        //debugger;

        let tile1 = openTiles[0];
        let tile2 = openTiles[1];

        let equal = tile1.name == tile2.name;


        if (equal) {
            completeTiles();
        }
        else {
            timeout = setTimeout(() => {
                timeout = null;
                closeTiles();
            }, 700);
        }

    }

    function openTile(tile) {
        openTiles.push(tile);
        setImage(tile, "images/" + tile.name + ".png");
    }

    function closeTiles() {
        openTiles.forEach(tile => {
            setImage(tile, cardback)
        });
        openTiles = [];
    }

    function completeTiles() {
        openTiles.forEach(tile => {
            var domTile = getDomTile(tile);
            domTile.css("background-color", "rgb(0,102,15)");
        });
        completedTiles.push(...openTiles);
        openTiles = [];
    }

    function canOpen(tile) {
        if (openTiles.length < 2
            && openTiles.every(x => x.id != tile.id)
            && completedTiles.every(x => x.id != tile.id)
        )
            return true;
        return false;
    }

    function getDomTile(tile) { //Dom is zichtbare versie
        return $("#" + tile.id);
    }

    function getTile(dom_tile) {
        return tile_dict[dom_tile.attr("id")];
    }

    function setImage(tile, url) {
        var domTile = getDomTile(tile);
        let img = domTile.find(".card-img-top");
        img.attr("src", url);
    }
  
    function shuffle(array) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      }
  });