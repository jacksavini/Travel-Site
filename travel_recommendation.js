var xhr = new XMLHttpRequest()
var url = './travel_recommendation_api.json'

xhr.open('GET', url, true)
xhr.responseType = 'json'
xhr.send();

window.onload = function(){
    var searchBar = document.getElementById("search");
    console.log(searchBar)
    searchBar.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            getRecs()
        }
    });
}

function fillSearch(key) {
    var searchResults = document.getElementById("recs");
    searchResults = document.getElementById("recs");
    searchResults.innerHTML = "";
    if(key.length == 0){
        return
    }

    var searchDiv = makeSearch(key[0])
    searchResults.appendChild(searchDiv)
}

function makeSearch(type){
    function makeDiv(searchDiv, obj){
        var name = obj.name;
        var img = obj.imageUrl
        var description = obj.description

        var title = document.createElement('h2');
        title.textContent = name;

        var pic = document.createElement('img');
        pic.src = "pics/" + img
        pic.width = 150
        pic.height = 100

        var tag = document.createElement('p');
        tag.textContent = description

        searchDiv.appendChild(title)
        searchDiv.appendChild(pic)
        searchDiv.appendChild(tag)
    }

    var searchDiv = document.createElement('div');
    searchDiv.classList.add('rec');

    var objs = xhr.response[type]

    objs.forEach(function(obj){
        if(type == "countries"){
            obj.cities.forEach(function(city){
                makeDiv(searchDiv, city)
            })
        }
        else{
            makeDiv(searchDiv, obj)
        }
    })
    
    return searchDiv
}

function getRecs(){
    let keyWord = document.getElementById("search")
    let keyWords = checkKeywords(keyWord.value)

    fillSearch(keyWords)
}

function clearRecs(){
    let keyWord = document.getElementById("search")
    keyWord.value = ""

    fillSearch([])
}

function checkKeywords(str){
    checkWords = [
        ["beach", "beaches"], 
        ["temple", "temples"], 
        ["country", "countries"],
        ["countries", "countries"],
    ]

    let finArr = []

    str = str.toLowerCase()

    for(let i=0; i<checkWords.length; i++){
        if(str.includes(checkWords[i][0])){
            finArr.push(checkWords[i][1])
            if(i==2){
                return finArr
            }
        }
    }

    return finArr

}