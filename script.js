document.getElementById("searchBtn").addEventListener("click", async () => {
  const medicine = document.getElementById("medicineInput").value.toLowerCase();
  if (!medicine) {
    Swal.fire("Oops!", "Please enter a medicine name", "warning");
    return;
  }

  const res = await axios.get("data/mock_search.json");
  const results = res.data.filter(item => item.medicine.toLowerCase().includes(medicine));

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  results.forEach(r => {
    const card = document.createElement("div");
    card.className = "p-3 m-2 bg-white rounded shadow";
    card.innerHTML = `<b>${r.pharmacy}</b><br>${r.medicine} - ${r.availability}<br>Price: ${r.price}`;
    resultsDiv.appendChild(card);
  });

  // Map
  const map = L.map("map").setView([12.9716, 77.5946], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  results.forEach(r => {
    const marker = L.marker([r.lat, r.lng]).addTo(map);
    marker.bindPopup(`<b>${r.pharmacy}</b><br>${r.medicine} - ${r.availability}`);
  });
});
