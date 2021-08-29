window.onload = () => {
    $("#gacha-button").click( () => {
        let image = "#gacha-result-img"
        let manyCard = $(".gacha-result-img").length
        let cardWidth= $(".gacha-result-img").width()
        let cardHeight = $(".gacha-result-img").height()
        let number = Math.floor((Math.random() * 1000)) %  manyCard
        image += number
        console.log(number)

        $(image).css({
            visibility: "visible"
        })

        let currentLeft = -number * cardWidth

        $("#gacha-result-longer").animate({
            left: currentLeft
        }, 0)
    })
}