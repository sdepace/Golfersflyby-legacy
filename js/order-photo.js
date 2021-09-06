$(document).ready(() => {
    
    const photoSelect = document.getElementById("photo-select");
    photoSelect.addEventListener("change", (event) => {
        document.querySelector("#main-photo").src = event.target.value;
    })
    
    document.querySelectorAll("#photo-previews div").forEach(({children: [img, p]}, i) => {
            
        img.addEventListener("click", () => {
            document.querySelector("#main-photo").src = img.src;
            photoSelect.value = img.src
        })

        photoSelect.add(new Option(p.innerText, img.src)); 
    })

    const textbox = $("#photo-text");
    const mat = document.getElementById("cutout");
    const subtitle = document.getElementById("frame-subtitle");
    const linetwo = document.getElementById("linetwo");
    const linethree = document.getElementById("linethree");


    textbox.on("change paste keyup", event => {
        if(textbox.val().length > 0){
            mat.src = "./images/frame-preview/mats/njn3.png";
            subtitle.classList.add('threeline');
            subtitle.classList.remove('oneline');
            linetwo.hidden = false;
            linethree.hidden = false;
        } else {
            mat.src = "./images/frame-preview/mats/njn1.png";
            subtitle.classList.add('oneline');
            subtitle.classList.remove('threeline');
            linetwo.hidden = true;
            linethree.hidden = true;
        }
        const [two, three] = textbox.val().split("\n")
        linetwo.innerText = two || " ";
        linethree.innerText = three || " ";
    });

    document.getElementById("order-form").addEventListener("submit", (event) => {
        document.getElementById("output").value = [...document.querySelectorAll(".include-in-form")].map(elm => elm.name + ": " + elm.value.replace("\n", "<br>")).join("<br>");
        alert("Order received! We will send you a proof for your review shortly.")
        e.preventDefault()
    })
    


})

