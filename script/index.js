const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`)
    return (htmlElements.join(" "))
}

const manageSpinner=(status)=>{
if(status == true){
    document.getElementById('spinner').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
}
else{
    document.getElementById('word-container').classList.remove('hidden')
    document.getElementById('spinner').classList.add('hidden')
 
}
}
const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((data) => displayLesson(data.data))
}

const removeActive = () => {
    const lessonBtns = document.querySelectorAll('.lesson-btn')
    lessonBtns.forEach((btn) => btn.classList.remove('active'))
}

const loadLevelWord = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add('active')
            displayLevelWord(data.data)
        })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)
}

const displayWordDetails = (word) => {
    const detailsBox = document.getElementById('details-container')
    detailsBox.innerHTML = `

        <div class="">
          <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation}) </h2>
        </div>
        <div class="">
          <h2 class="font-bold">meaning </h2>
          <p>${word.meaning} </p>
        </div>
        <div class="">
          <h2 class="font-bold">example </h2>
          <p>${word.sentence} </p>
        </div>
        <div class="">
          <h2 class="font-bold">synonym </h2>
           <div class="">${createElement(word.synonyms)}</div>
        </div>

`
    document.getElementById('word_modal').showModal()

}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
      <div class="text-center col-span-full">
        <img class="mx-auto my-4" src="./assets/alert-error.png" alt="">
        <p class="text-gray-600 font-semibold font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-semibold text-3xl font-bangla mt-5">নেক্সট Lesson এ যান</h2>
      </div>
        `;
        manageSpinner(false)
        return;
    }
    words.forEach((word) => {

        const card = document.createElement('div')
        card.innerHTML = `
    <div class="bg-white p-10 rounded-xl text-center">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "word not found"}</h2>
        <p class="my-3"> Meaning /Pronounciation </p>
        <p class="text-xl font-semibold font-bangla">"${word.meaning ? word.meaning : "meaning not found"} / ${word.pronunciation ? word.pronunciation : "pronunciation not found"}"</p>
        <div class="flex justify-between items-center mt-5">
          <button  onclick="loadWordDetail(${word.id})" class="bg-gray-300 hover:bg-gray-400 p-1 rounded-md"><i class="fa-solid fa-circle-info"></i></button>
          <button class="bg-gray-300 hover:bg-gray-400 p-1 rounded-md"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
        wordContainer.appendChild(card)
    })
    manageSpinner(false)
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        console.log(lesson)
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" 
        onclick="loadLevelWord(${lesson.level_no})" 
        class="btn btn-outline btn-primary lesson-btn" href=""><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        `
        levelContainer.appendChild(btnDiv);
    }

}

loadLessons();
document.getElementById('btn-search').addEventListener('click',()=>{
    const input = document.getElementById('input-search')
    const searchValue =input.value.trim().toLowerCase()

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then((res)=>res.json())
    .then((data)=>{
        const allWords=data.data;
    })
})