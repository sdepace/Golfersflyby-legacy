$(document).ready(() => {
    

    const photosObj = [...document.querySelectorAll("#photo-previews > div > img")]
        .map((img) => { 
            return {
                src: img.src,
                hole: img.getAttribute("hole"),
                parValue: img.getAttribute("parValue")
            }
        });
        
    let selected = photosObj.find(({src}) => src === document.querySelector("#main-photo").src);
    const selectHole = () => {
        switch(mode) {
            case "Hole In One":
                document.querySelector("#right > .lineone").innerText = selected.hole ? `Hole #${selected.hole}` : "";
                document.querySelector("#right > .linetwo").innerText = selected.parValue;
                break;
            case "Event Award":
            case "Framed Photo":
            default: 
                document.querySelector("#left > .lineone").innerText = selected.hole ? `Hole #${selected.hole}` : "";
                document.querySelector("#right > .lineone").innerText = selected.parValue;
                break;
        }
    }

    document.querySelectorAll("#photo-previews div").forEach(({children: [img, p]}, i) => {
            
        img.addEventListener("click", () => {
            document.querySelector("#main-photo").src = img.src;
            selected = photosObj.find(({src}) => src === img.src)
            selectHole()
        })
    })


    let mode = "Framed Photo";

    // TODO: 
    // Fixes for deselecting image

    selectHole();

})

