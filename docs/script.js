const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector("input"),
volume = wrapper.querySelector(".word i"),
synonyms = wrapper.querySelector(".synonyms .list");
let audio;

function data(result){
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0];
    console.log(result);
    var phonetics = result[0].phonetics;
    for(var k in phonetics) {
        if(phonetics[k].text != undefined){
            phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[k].text}/`;
            break;
        }
    };
    
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phontetics;
    document.querySelector(".meaning span").innerText = definitions.definition;

    if(definitions.example != undefined){
        document.querySelector(".example span").innerText = definitions.example;
    }
    else{
        document.querySelector(".example span").innerText = "Can't find 😞"
    }

    for(var k in phonetics) {
        if(phonetics[k].audio != ''){
            audio = new Audio(result[0].phonetics[k].audio);
            break;
        }
    };
    

    if(definitions.synonyms[0] == undefined){
        synonyms.parentElement.style.display = "none";
    }else{
        synonyms.parentElement.style.display = "block";
        synonyms.innerHTML = "";
        for (var k in definitions.synonyms) {
            let tag = `<span onclick="searchFromSynonym('${definitions.synonyms[k]}')">${definitions.synonyms[k]},</span>`;
            synonyms.insertAdjacentHTML("beforeend", tag);
        }
    }
}

function fetchApi(word){
    wrapper.classList.remove("active");
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(response => response.json()).then(result => data(result)).catch(() =>{
        alert(`Can't find the meaning of "${word}". Please, try to search for another word.`);
    });
}

function searchFromSynonym(word){
    fetchApi(word);
}

function getURLParameter()
{
    const params = new URLSearchParams(document.location.search);
    const param = params.get('word');
    fetchApi(param);
}

document.addEventListener('DOMContentLoaded', function() {
    getURLParameter();
}, false);

volume.addEventListener("click", ()=>{
    volume.style.color = "#ff5e00";
    audio.play();
    setTimeout(() =>{
        volume.style.color = "#999";
    }, 800);
});


