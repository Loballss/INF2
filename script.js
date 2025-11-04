// === Handlekurv-funksjoner ===
function loadCart() {
  return JSON.parse(localStorage.getItem("cart") || '{"items":[]}');
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(meal) {
  const cart = loadCart();
  cart.items.push(meal);
  saveCart(cart);
  alert(`${meal.title} ble lagt i kurven.`);
}
function renderCart() {
  const container = document.getElementById("cart-contents");
  if (!container) return;
  const cart = loadCart();
  if (cart.items.length === 0) {
    container.innerHTML = "<p>Kurven er tom.</p>";
    const amt = document.getElementById("amount");
    if (amt) amt.value = "";
    return;
  }
  let html = "<ul>";
  let total = 0;
  cart.items.forEach(item => {
    html += `<li>${item.title} – kr ${item.price}</li>`;
    total += item.price;
  });
  html += "</ul>";
  container.innerHTML = html + `<p><strong>Total: kr ${total}</strong></p>`;
  const amountInput = document.getElementById("amount");
  if (amountInput) amountInput.value = total;
}

// === Fake betaling ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("payment-form");
  if (form) {
    renderCart();
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const card = document.getElementById("card").value.trim();
      if (!name || !card) return alert("Fyll inn navn og kortnummer.");
      const total = document.getElementById("amount").value;
      localStorage.removeItem("cart");
      document.getElementById("cart-contents").innerHTML = "";
      document.getElementById("result").innerHTML =
        `<div class='feature-card'><h3>✅ Betaling fullført</h3><p>Takk for din testbetaling på kr ${total}.</p><p>Dette var en demo.</p></div>`;
    });
  }
});

// === Allergikommentar ===
document.addEventListener("DOMContentLoaded", () => {
  const commentBtn = document.getElementById("comment-btn");
  if (commentBtn) {
    commentBtn.addEventListener("click", () => {
      const text = document.getElementById("comment").value.trim();
      const result = document.getElementById("comment-result");
      if (text === "") {
        result.innerHTML = "<span style='color:#E74C3C'>⚠️ Vennligst skriv en kommentar før du sender.</span>";
      } else {
        result.innerHTML = "<span style='color:green'>✅ Kommentar sendt (test)</span>";
        document.getElementById("comment").value = "";
      }
    });
  }
});

// === Helseinformasjon ===
document.addEventListener("DOMContentLoaded", () => {
  const healthBtn = document.getElementById("health-btn");
  if (healthBtn) {
    healthBtn.addEventListener("click", () => {
      const type = document.getElementById("health-select").value;
      const notes = document.getElementById("health-notes").value.trim();
      const result = document.getElementById("health-result");
      if (!type && !notes) {
        result.innerHTML = "<span style='color:#E74C3C'>⚠️ Vennligst fyll ut helsetype eller detaljer.</span>";
        return;
      }
      result.innerHTML = "<span style='color:green'>✅ Helseinformasjon sendt (test)</span>";
      document.getElementById("health-select").value = "";
      document.getElementById("health-notes").value = "";
    });
  }
});

// === Fake abonnement ===
function fakePurchase(type) {
  const result = document.getElementById("sub-result");
  result.innerHTML = `✅ ${type} sendt (test). Ingen betaling er gjennomført.`;
  setTimeout(() => { result.innerHTML = ""; }, 5000);
}
