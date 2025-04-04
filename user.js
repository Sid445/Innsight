document.addEventListener("DOMContentLoaded", function () {
    const accommodations = [
      {
        title: "Sunny Hostel",
        rent: "5000",
        amenities: "Wi-Fi, Food, Cleaning",
        location: "Downtown",
        img: "assets/images/hostel1.jpg",
      },
      {
        title: "Cozy Flat",
        rent: "8000",
        amenities: "Wi-Fi, Hot Water, Cleaning",
        location: "Uptown",
        img: "assets/images/flat1.jpg",
      },
    ];
  
    const accommodationList = document.getElementById("accommodationList");
  
    accommodations.forEach((acc) => {
      const accDiv = document.createElement("div");
      accDiv.classList.add("accommodation-item");
  
      accDiv.innerHTML = `
        <img src="${acc.img}" alt="${acc.title}">
        <h3>${acc.title}</h3>
        <p><strong>Rent:</strong> ₹${acc.rent}</p>
        <p><strong>Amenities:</strong> ${acc.amenities}</p>
        <p><strong>Location:</strong> ${acc.location}</p>
      `;
  
      accommodationList.appendChild(accDiv);
    });
  
    document.getElementById("applyFilters").addEventListener("click", function () {
      const rentFilter = document.getElementById("rentFilter").value;
      const locationFilter = document.getElementById("locationFilter").value.toLowerCase();
  
      const filteredList = accommodations.filter((acc) => {
        return (
          (!rentFilter || acc.rent <= rentFilter) &&
          (!locationFilter || acc.location.toLowerCase().includes(locationFilter))
        );
      });
  
      accommodationList.innerHTML = "";
  
      filteredList.forEach((acc) => {
        const accDiv = document.createElement("div");
        accDiv.classList.add("accommodation-item");
  
        accDiv.innerHTML = `
          <img src="${acc.img}" alt="${acc.title}">
          <h3>${acc.title}</h3>
          <p><strong>Rent:</strong> ₹${acc.rent}</p>
          <p><strong>Amenities:</strong> ${acc.amenities}</p>
          <p><strong>Location:</strong> ${acc.location}</p>
        `;
  
        accommodationList.appendChild(accDiv);
      });
    });
  });
  