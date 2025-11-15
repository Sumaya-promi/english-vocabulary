const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then((res) => res.json())
        .then((data) => displayLesson(data.data))
}

const removeActive=()=>{
    const lessonBtns = document.querySelectorAll('.lesson-btn')
    lessonBtns.forEach((btn)=> btn.classList.remove('active'))
}

const loadLevelWord = (id) => {
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
        `
    }
    words.forEach((word) => {

        const card = document.createElement('div')
        card.innerHTML = `
    <div class="bg-white p-10 rounded-xl text-center">
        <h2 class="font-bold text-2xl">${word.word?word.word:"word not found"}</h2>
        <p class="my-3"> Meaning /Pronounciation </p>
        <p class="text-xl font-semibold font-bangla">"${word.meaning?word.meaning:"meaning not found"} / ${word.pronunciation?word.pronunciation:"pronunciation not found"}"</p>
        <div class="flex justify-between items-center mt-5">
          <button  onclick="my_modal_5.showModal()" class="bg-gray-300 hover:bg-gray-400 p-1 rounded-md"><i class="fa-solid fa-circle-info"></i></button>
          <button class="bg-gray-300 hover:bg-gray-400 p-1 rounded-md"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `
        wordContainer.appendChild(card)
    })
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