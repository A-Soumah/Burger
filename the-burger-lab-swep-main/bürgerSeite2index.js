
    let sidebar = document.querySelector('.sidebar'); // Greift auf das erste Element mit .sidebar zu
    let buergermenue = document.querySelector(".fa-solid.fa-bars"); // Greift auf das Burger-Icon zu
    let closeButton=document.querySelector(".fa-xmark");

    buergermenue.addEventListener("click", function() {
        if (sidebar.classList.contains("hidden")) {
            sidebar.classList.remove("hidden");


    }
        sidebar.classList.add("visible");})

    closeButton.addEventListener("click", function (){
        if (sidebar.classList.contains("visible")) {
            sidebar.classList.remove("visible");


        }
        sidebar.classList.add("hidden");})




    function toggleVisibility() {
        let element = document.querySelector(".my-element");

        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
            element.classList.add("visible");
        } else {
            element.classList.remove("visible");
            element.classList.add("hidden");
        }
    }
