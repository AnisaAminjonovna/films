function sortedDate(date){
    let time = new Date(date)

    let day = time.getDate()
    let month = time.getMonth()+1
    let year = time.getFullYear()

    return day + "." + month+ "." + year  
}