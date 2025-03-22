
document.getElementById("anmelderegisterForm").addEventListener("submit", async function(event)  {

    let anmeldeUsername=document.getElementById("anmeldeUsername").value;
    let anmeldePassword=document.getElementById("anmeldePassword").value;

    const response = await fetch("http://localhost:5000/anmelden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anmeldeUsername,  anmeldePassword })
    });

    const data = await response.json();
    alert(data.message); // Meldung anzeigen
});

