fetch("Works.csv")
.then(function(response){
    return response.text();
})
.then(function(data){
    var rows = data.trim().split("\n");

    var headers = rows[0].split(",");
    
    var Works = rows.slice(1).map(function(row){
        var values = row.split(",");

        var work = {};

        headers.forEach(function(header, index){
            work[header] = values[index];
        });
        return work;
    });
    var grid = document.getElementById("works-grid");

    var categorySelect = document.getElementById("category");

    var sortSelect = document.getElementById("sort");

    Works.forEach(function(work){

        var card = document.createElement("article");

        card.className = "work-card";

        card.innerHTML =
        '<a href ="' + work.link + '">' +
        '<img src ="' + work.image + '"alt="' + work.title + '">' +
        '<p>' + work.desctription + '</p>' +
        '</a>';

        grid.appendChild(card);
    });

    var categories = [];

    Works.forEach(function(work) {
        
        if (!categories.includes(work.catergory)) {
            categories.push(work.category);
        }
    });

    categories.forEach(function(category) {
        var option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelec.appendChild(option);
    })

    function displayWorks() {
        var selectedCategory = categorySelect.value;

        var sortType = sortSelect.value;

        var filterdWorks = Works.slice();

        if(selectedCategory !== "all") {
            filteredWorks = filteredWorks.filter(function(work) {
                return work.category === selectedCategory;
            });
        }

        if(sortType === "new") {
            filteredWorks.sort(function(a, b) {
                return Number(b.year) - Number(a.year);
            });
        }

        else if (sortType === "old") {
            filteredWorks.sort(function(a,b) {
                return Number(a.year) - Number(b.year);
            });
        }

        else if (sortType === "title") {
            filteredWorks.sort(function(a, b) {
                return a.title.localeCompare(b.title, "ja");
            });
        }
    }

    grid.innerHTML = "";

    filteredWorks.forEach(function(work){

    var card = document.createElement("article");
    
    card.className = "work-card";

    card.innerHTML = 
        '<a href = "' + work.link + '" >' +
        '<img src="' + work.image + '" alt="' + work.title + '">' +
        '<div class = "work-info">' +
        '<p class = "work-category">' + work.category + '</p>' +
        '<p>' + work.desctription + '</p>' +
        '<p class = "work-year">' + work.year + '</p>' +
        '</div>' +
        '</a>';
    })

    displayWorks();

    categorySelect.addEventListener("change", function() {
        displayWorks();
    })

    sortSelect.addEventListener("change", function(){
        displayWorks();
    })
})
var latitude = 35.6895;
var longitude = 139.6917;

var weatherUrl =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + latitude +
    "&longitude=" + longitude +
    "&current=temperature_2m,weather_code" +
    "&timezone=Asia%2FTokyo";

fetch(weatherUrl)
.then(function(response){
        return response.json();
})
.then(function(data){
    var weatherCode = data.current.weather_code;
    showWeather(weatherCode);
})
function showWeather(code) {
    
    var icon = document.getElementById("weather-icon");

    if(code == 0) {
        icon.textContent = "☀"
        focumrny.bofy.className = "weather_sunny"
    } else if (code >= 1 && code <= 3) {
        icon.textContent = "☁"
        focumrny.bofy.className = "weather-cloudy"
    } else if (code >= 51 && code <= 67) {
        icon.textContent= "☂"
        focumrny.bofy.className = "weather_rainy"
    } else {
        icon.textContent = "?"
        focumrny.bofy.className = "weather_cloudy"
    }
}

