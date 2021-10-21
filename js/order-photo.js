$(document).ready(() => {
    
    const photoSelect = document.getElementById("photo-select");

    photoSelect.addEventListener("change", (event) => {
        document.querySelector("#main-photo").src = event.target.value;
        selected = photosObj.find(({src}) => src === event.target.value)
        selectHole()
    })

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
            photoSelect.value = img.src
            selected = photosObj.find(({src}) => src === img.src)
            selectHole()
        })

        photoSelect.add(new Option(p.innerText, img.src)); 
    })

    const mat = document.getElementById("cutout");
    const subtitle = document.getElementById("frame-subtitle");

    const awardSelect = document.getElementById("award-select");
    const eventAward = document.getElementById("event-award");
    const holeInOne = document.getElementById("hole-in-one");

    let mode = "Framed Photo";

    // TODO: 
    // Fixes for deselecting image

    awardSelect.addEventListener("change", (event) => {
        mode = event.target.value;
        //clear unneccesary fields
        [...document.querySelectorAll('#hole-in-one > .include-in-form,#event-award > .include-in-form')].forEach(elm => elm.value = "");

        switch(event.target.value){
            case "Hole In One":
                eventAward.hidden = true;
                holeInOne.hidden = false;
                mat.src = "./images/frame-preview/mats/3line.png";
                subtitle.classList.add('threeline');
                subtitle.classList.remove('oneline');
                document.querySelector("#left > .linetwo").hidden = false;
                document.querySelector("#left > .linethree").hidden = true;
                document.querySelector("#middle > .linetwo").hidden = false;
                document.querySelector("#middle > .linethree").hidden = true;
                document.querySelector("#right > .linetwo").hidden = false;
                document.querySelector("#right > .linethree").hidden = false;

                document.querySelector("#left > .lineone").innerText = "Witnessed By:";

                break;
            case "Event Award":
                eventAward.hidden = false;
                holeInOne.hidden = true;
                mat.src = "./images/frame-preview/mats/3line.png";
                subtitle.classList.add('threeline');
                subtitle.classList.remove('oneline');
                document.querySelector("#left > .linetwo").hidden = true;
                document.querySelector("#left > .linethree").hidden = true;
                document.querySelector("#middle > .linetwo").hidden = false;
                document.querySelector("#middle > .linethree").hidden = false;
                document.querySelector("#right > .linetwo").hidden = true;
                document.querySelector("#right > .linethree").hidden = true;
                
                
                break;
            case "Framed Photo": 
                eventAward.hidden = true;
                holeInOne.hidden = true;
                mat.src = "./images/frame-preview/mats/1line.png";
                subtitle.classList.add('oneline');
                subtitle.classList.remove('threeline');
                document.querySelector("#left > .linetwo").hidden = true;
                document.querySelector("#left > .linethree").hidden = true;
                document.querySelector("#middle > .linetwo").hidden = true;
                document.querySelector("#middle > .linethree").hidden = true;
                document.querySelector("#right > .linetwo").hidden = true;
                document.querySelector("#right > .linethree").hidden = true;

                break;
            default: 
                eventAward.hidden = true;
                holeInOne.hidden = true;
                mat.src = "./images/frame-preview/mats/1line.png";
                subtitle.classList.add('oneline');
                subtitle.classList.remove('threeline');
                document.querySelector("#left > .linetwo").hidden = true;
                document.querySelector("#left > .linethree").hidden = true;
                document.querySelector("#middle > .linetwo").hidden = true;
                document.querySelector("#middle > .linethree").hidden = true;
                document.querySelector("#right > .linetwo").hidden = true;
                document.querySelector("#right > .linethree").hidden = true;
                break;
        }
        selectHole()
    });

    let date = '';
    let pName = '';

    document.getElementById("player-name").addEventListener("keyup", (event) => {
        pName = event.target.value;
        document.querySelector("#middle > .linetwo").innerText = `Hole in One - ${pName} - ${moment(date).format("MMMM D, YYYY")}`
    });
    document.getElementById("date-hit").addEventListener("change", (event) => {
        date = event.target.value;
        document.querySelector("#middle > .linetwo").innerText = `Hole in One - ${pName} - ${moment(date).format("MMMM D, YYYY")}`
    });

    document.getElementById("club-used").addEventListener("keyup", (event) => {
        document.querySelector("#right > .linethree").innerText = event.target.value;
    });

    document.getElementById("distance").addEventListener("change", (event) => {
        document.querySelector("#right > .linetwo").innerText = [...selected.parValue.split(" ").slice(0, 2), event.target.value, selected.parValue.split(" ")[3]].join(" ");
    });

    document.getElementById("witnesses").addEventListener("keyup", (event) => {
        document.querySelector("#left > .linetwo").innerText = event.target.value;
    });

    document.getElementById("player-names").addEventListener("keyup", (event) => {
        document.querySelector("#middle > .linethree").innerText = event.target.value;
    });

    document.getElementById("award-name").addEventListener("keyup", (event) => {
        document.querySelector("#middle > .linetwo").innerText = event.target.value;
    });

    // fixes submits on enter key
    $("#order-form").on("keypress", event => {
        let keyPressed = event.keyCode || event.which;
        if (keyPressed === 13) {
            event.preventDefault();
            return false;
        }
    });

    document.getElementById("order-form").addEventListener("submit", (event) => {
        if(!/^\S+@\S+\.\S+$/.test(document.getElementById("email").value)) {
            alert("Please enter a valid email address");
            event.preventDefault();
            return false;
        } else {
            document.getElementById("output").value = [...document.querySelectorAll(".include-in-form")].map(elm => elm.name + ": " + elm.value.replace("\n", "<br>")).join("<br>");
            alert("Order received! We will send you a proof for your review shortly.")
        }
        
    })
    
    selectHole();

})

