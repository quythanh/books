$('#access-key').keyup(() => {
    if ($('#access-key').val() === "anh iu em") {
        localStorage.setItem("TTBTKDBP-accessible", $('#access-remember')[0].checked - 0)
        Start()
    }
})

var currentChapter = localStorage.getItem("TTBTKDBP-chapter") - 0 || 0,
    quantity;
const chapter = $('#chapter')

const RenderChapter = chap => {
    $.getJSON(`./data/${chap}.json`, data => {
        $('h1.title').html(data["title"])
        $('.content').html(data["content"])
        localStorage.setItem("TTBTKDBP-chapter", data["chapter"])
        chapter.val(data["chapter"] + 1)
    })
    $('html, body').animate({scrollTop: 0}, 800)
}

chapter.keydown(e => {
    if (e.key === "Enter") {
        chapter.blur() // unfocus
        let newChapter = chapter.val()

        if (newChapter - currentChapter - 1) {
            if (newChapter > quantity) {
                newChapter = quantity
                if (currentChapter - quantity + 1) {
                    currentChapter = newChapter
                    RenderChapter(--currentChapter)
                }
                else
                    chapter.val(newChapter)
            }
            else if (newChapter < 1) {
                newChapter = 1
                if (currentChapter) {
                    currentChapter = newChapter
                    RenderChapter(--currentChapter)
                }
                else
                    chapter.val(1)
            }
            else {
                currentChapter = newChapter
                RenderChapter(--currentChapter)
            }
        }
    }
})

const Start = () => {
    if (localStorage.getItem("TTBTKDBP-accessible") - 0) {
        $.getJSON('./data/info.json', data => quantity = data["quantity"] - 0)
        RenderChapter(currentChapter);
        
        $('.access').remove()

        $(window).keydown(e => {
            switch (e.key) {
                case "w":
                case "W":
                    window.scrollBy({
                        left: 0,
                        top: -120.80000305175781,
                        behavior: 'smooth'
                    })
                    break
                
                case "s":
                case "S":
                    window.scrollBy({
                        left: 0,
                        top: 120.80000305175781,
                        behavior: 'smooth'
                    })
                    break
                
                case "a":
                case "A":
                case "ArrowLeft":
                    e.preventDefault()
                    if (currentChapter > 0)
                        RenderChapter(--currentChapter)
                    break
                
                case "d":
                case "D":
                case "ArrowRight":
                    e.preventDefault()
                    if (currentChapter < quantity - 1)
                        RenderChapter(++currentChapter)
                    break
            }
        })

        $(".toolbar .fa-caret-left").parent().click(() => 
            currentChapter > 0
                ? RenderChapter(--currentChapter)
                : null
        )
            
        $(".toolbar .fa-caret-right").parent().click(() => 
            currentChapter < quantity - 1
                ? RenderChapter(++currentChapter)
                : null
        )
    }
}

Start()