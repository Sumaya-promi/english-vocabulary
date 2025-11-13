const loadLessons = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res)=>res.json())
    .then((data)=>displayLesson(data.data))
}

const loadLevelWord=(id)=>{
const url =`https://openapi.programming-hero.com/api/level/${id}`
fetch(url)
.then((res)=>res.json())
.then((data)=> displayLevelWord(data.data))
}

const displayLevelWord=(words)=>{
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML="";
words.forEach((word)=>{

    const card= document.createElement('div')
    card.innerHTML=`
    <div class="bg-white p-10 rounded-xl text-center">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="my-3"> Meaning /Pronounciation </p>
        <p class="text-xl font-semibold font-bangla">"${word.meaning} / ${word.pronunciation}"</p>
        <div class="flex justify-between items-center mt-5">
          <button class="bg-gray-300 hover:bg-gray-400 p-1 rounded-md"><i class="fa-solid fa-circle-info"></i></button>
          <button class="bg-gray-300 hover:bg-gray-400 p-1 rounded-md"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
    wordContainer.appendChild(card)
})
}

const displayLesson=(lessons)=>{
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML="";

    for(let lesson of lessons){
        console.log(lesson)
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML= `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary" href=""><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        `
        levelContainer.appendChild(btnDiv);
    }

}

loadLessons();