async function fetch_meaning(word) {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    if (response.ok) {
        let data = await response.json()
        return data
    }
    else {
        return "Invalid word"
    }
}

function Play()
{
  var myAudio = document.getElementById("audioval");
  if(myAudio.paused) {
      myAudio.play();
  }
  else {
     myAudio.pause();
  }
}



const btn = document.getElementById("search-btn");
//console.log(btn);

btn.addEventListener("click", async (event) => {
    const word = document.getElementById("word").value;
    meaning = await fetch_meaning(word)
    if (meaning != "Invalid word") {
        //console.log(meaning[0]);
        const definition = meaning[0]['meanings'][0]['definitions'][0]['definition'];
        const partOfSpeech = meaning[0]['meanings'][0]['partOfSpeech'];
        const audio=meaning[0]['phonetics']
        //console.log(audio);
        let i=0
        for(i=0;i<audio.length;i++){
            if (audio[i]['audio']!==''){
                break;
            }
        }
        console.log(audio[i])
        document.getElementById("result-area").innerHTML = `
        <div class="w3-card-4" style="width:30%;min-width:300px">
        <header class="w3-container w3-blue">
        <h3>${word.toUpperCase()} <img src="../images/audio.png" onClick="Play()" width=20px><audio id="audioval"><source src="${audio[i]['audio']}" type="audio/mp3"></audio></h3>
        </header>
        <div class="w3-container">
        <p>${definition}</p>
        </div>
        <footer class="w3-container w3-blue">
        <h5>Part of speech: ${partOfSpeech}</h5>
        </footer>
        </div>`;
    }
    else {
        document.getElementById("result-area").innerHTML = `<p style="color:red;">Invalid word please try again with a different word</p>`
        //console.log(meaning);
    }

})