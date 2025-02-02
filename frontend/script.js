async function addInvestment() {
    const coin = document.getElementById("coin").value;
    const amount = document.getElementById("amount").value;
    const price = document.getElementById("price").value;

    await fetch('http://localhost:5000/invest', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coin, amount, buy_price: price })
    });

    loadInvestments();
}

async function loadInvestments() {
    const response = await fetch('http://localhost:5000/investments');
    const investments = await response.json();
    document.getElementById("investments").innerHTML = investments.map(i => 
        `<li>${i.coin.toUpperCase()}: ${i.amount} куплено за $${i.buy_price}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", loadInvestments);
