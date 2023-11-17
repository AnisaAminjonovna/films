let elList = document.querySelector(".films__card-wrapper")
let elTamplate = document.querySelector("#template")
let elForm = document.querySelector(".form")
let elFormSelect = elForm.querySelector(".films__select")
let elFormFilter = elForm.querySelector(".films__filter")
let elFormInput = elForm.querySelector(".films__input-serach")


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

    renderArr(filtiredArr.elList)

})
renderArr(films, elList)