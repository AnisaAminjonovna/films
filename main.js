let elList = document.querySelector(".films__card-wrapper")
let elTamplate = document.querySelector("#template").content
let elForm = document.querySelector(".form")
let elFormSelect = elForm.querySelector(".films__select")
let elFormFilter = elForm.querySelector(".films__filter")
let elFormInput = elForm.querySelector(".films__input-serach")
let elModal = document.querySelector(".modal")
let modalCloseBtn = elModal.querySelector(".modal__close-btn")


window.addEventListener("click", e =>{
    if (e.target == elModal) {
        elModal.classList.remove("modal-active")
        document.body.style.overflow = "auto"
    }
})
modalCloseBtn.addEventListener("click", () => {
    elModal.classList.remove("modal-active")
    document.body.style.overflow = "auto"
})



function uniqueSelectFilms(arr, list){
    let result = []
    arr.forEach(item =>{
        item.genres.forEach(genre =>{
           if (!result.includes(genre)) {
               result.push(genre)
           }
        })
    })

    result.forEach(element => {
        let newOption = document.createElement("option")
        newOption.textContent = element
        newOption.value = element
        list.appendChild(newOption)

    })
}
uniqueSelectFilms(films, elFormSelect)


function renderArr(arr, list){
    list.innerHTML = null
    arr.forEach(item => {
        let cloneTamplate = elTamplate.cloneNode(true)

        let filmsImg = cloneTamplate.querySelector(".films__img")
        let filmsTitle = cloneTamplate.querySelector(".films__card-title")
        let filmsDate = cloneTamplate.querySelector(".films__release-date")
        let filmsBtn = cloneTamplate.querySelector(".films__btn")

        filmsBtn.dataset.id = item.id

        filmsBtn.addEventListener("click", e =>{
            elModal.classList.add("modal-active")
            let filmId = e.target.dataset.id
            let modalImg = elModal.querySelector(".modal__img")
            let modalTitle = elModal.querySelector(".modal__title")
            let modalDescription = elModal.querySelector(".modal__description")
            let modalGenres = elModal.querySelector(".genre__list")
            document.body.style.overflow = "hidden"
            modalGenres.innerHTML = null
            if (filmId == item.id) {
                modalImg.src = item.poster
                modalTitle.textContent = item.title
                modalDescription.textContent = item.overview

                item.genres.map(g => {
                    let newLi = document.createElement("li")
                    newLi.textContent = g
                    modalGenres.appendChild(newLi)
                })
            }
           
        })

        filmsImg.src = item.poster
        filmsTitle.textContent = item.title
        filmsDate.textContent = sortedDate(item.release_date)
        list.appendChild(cloneTamplate) 

        
    })
}

elForm.addEventListener("submit", e =>{
    e.preventDefault()
    let inputValue = elFormInput.value.trim()
    let regex = new RegExp(inputValue, "gi")

    let filtiredArr = films.filter(item => item.title.match(regex))


    let filteredFilm = []

    if (elFormSelect.value.trim()== "All") {
        filteredFilm = filtiredArr
    }else{
        filteredFilm = filtiredArr.filter(item => item.genres.includes(elFormSelect.value.trim()))
    }
    renderArr(filteredFilm,elList)

})
renderArr(films, elList)
