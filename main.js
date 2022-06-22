document.getElementById("reader-init").addEventListener("click", startRsvp);
document.getElementById("reader-pause").setAttribute("disabled", "true")

function pauser() {
    return new Promise(resolve => {
        let playbuttonclick = function () {
            document.getElementById("reader-pause")
                .removeAttribute("disabled")

            document.getElementById("reader-play")
                .setAttribute("disabled", "true")

            document.getElementById("reader-play")
                .removeEventListener("click",
                    playbuttonclick);

            stats = 0;
            resolve("resolved");
        }
        document.getElementById("reader-play")
            .addEventListener("click", playbuttonclick)
    })
}

document.getElementById("reader-pause")
    .addEventListener("click", function () {

        stats = 1;

        document.getElementById("reader-pause")
            .setAttribute("disabled", "true")

        document.getElementById("reader-play")
            .removeAttribute("disabled")

    })
