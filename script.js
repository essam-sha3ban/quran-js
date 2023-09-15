let audioPlayer = document.querySelector(".audio-player")
let containerSwar = document.querySelector(".container-swar")
let ayah = document.querySelector(".ayah")
let next = document.querySelector(".next")
let play = document.querySelector(".play")
let prev = document.querySelector(".prev")
let audio = document.querySelector(".audio-player")


getSwar()
function getSwar(){
fetch("https://quran-endpoint.vercel.app/quran")
.then(response =>response.json())
.then(data=>{   
    
   for (let surah  in  data.data) {
 
    containerSwar.innerHTML +=
    `<div>
        <p>${data.data[surah].asma.ar.long}</p>
        <p>${data.data[surah].asma.en.long}</p>
    </div>
    `
   }
   let allSuarhs= document.querySelectorAll(".container-swar div")
   let ayaText ,ayaAudio;
   allSuarhs.forEach((item, index)=>{
        item.addEventListener("click", ()=>{
            fetch(`https://quran-endpoint.vercel.app/quran/${index + 1}`)
            .then(response =>response.json())
            .then(data=>{
                let reverses =data.data.ayahs;
                console.log(data.data.ayahs)
                ayaAudio =[]
                ayaText =[]
                reverses.forEach(revers=>{
                    ayaAudio.push(revers.audio.url)
                    let ayes =revers.text.ar  + "  :: " + revers.translation.en
                    ayaText.push(ayes)
                    
                })
                 let ayahIndex = 0;
                 changeAyah(ayahIndex)
                 audio.addEventListener("ended",()=>{
                    ayahIndex ++;
                    if(ayahIndex < ayaAudio.length){
                        changeAyah(ayahIndex)
                    }
                    else{
                        changeAyah(ayahIndex)
                        audio.pause()
                        swal({
                            title: "Good job surah ended",
                            
                            icon: "success",
                            timer:1500
                          });
                        ayahIndex =0;
                        isPlay=true;
                        togglePlay()
                        
                    }
                 })
                 next.addEventListener("click",()=>{
                    ayahIndex <ayaAudio.length-1?ayahIndex++:
                    ayahIndex=0;
                    changeAyah(ayahIndex)
                 })

                 prev.addEventListener("click",()=>{
                    ayahIndex == 0? ayahIndex = ayaAudio.length -1:
                    ayahIndex--;
                    ayahIndex =0
                    changeAyah(ayahIndex)
                 })

                 let isPlay =false;
                 togglePlay()
                 function togglePlay(){
                    if(isPlay){
                        audio.pause()
                        play.innerHTML=`<i class="fas fa-play"></i>`
                        isPlay=false
                    }
                    else{
                        audio.play()
                        play.innerHTML=`<i class="fas fa-pause"></i>`
                        isPlay=true
                    }
                 }

                 play.addEventListener("click",togglePlay)

                 function changeAyah(index){
                    ayah.innerHTML = ayaText [index]
                    audio.src = ayaAudio[index];
                   
                 }
            })
        })
   })
})
}



