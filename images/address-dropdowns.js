// Philippine province/city/barangay cascading dropdowns
// JSON files must be inside ./data/
// HTML select IDs: province, city, barangay

document.addEventListener("DOMContentLoaded", async () => {
  const provinceSelect = document.getElementById("province");
  const citySelect = document.getElementById("city");
  const barangaySelect = document.getElementById("barangay");

  if (!provinceSelect || !citySelect || !barangaySelect) return;

  const reset = (select, label) => {
    select.innerHTML = "";
    const option = document.createElement("option");
    option.value = "";
    option.textContent = label;
    select.appendChild(option);
  };

  reset(provinceSelect, "Select Province");
  reset(citySelect, "Select City/Municipality");
  reset(barangaySelect, "Select Barangay");

  try {
    const [pRes, cRes, bRes] = await Promise.all([
      fetch("data/province.json"),
      fetch("data/muncity.json"),
      fetch("data/barangay.json")
    ]);

    if (!pRes.ok || !cRes.ok || !bRes.ok) {
      throw new Error("Could not load one or more address JSON files.");
    }

    const provinces = await pRes.json();
    const cities = await cRes.json();
    const barangays = await bRes.json();

    provinces.sort((a, b) => {
      if (a.is_ncr) return -1;
      if (b.is_ncr) return 1;
      return a.description.localeCompare(b.description);
    });

    provinces.forEach(p => {
      const option = document.createElement("option");
      option.value = p.is_ncr ? "NCR" : String(p.province_id);
      option.textContent = p.description;
      provinceSelect.appendChild(option);
    });

    citySelect.disabled = true;
    barangaySelect.disabled = true;

    provinceSelect.addEventListener("change", () => {
      reset(citySelect, "Select City/Municipality");
      reset(barangaySelect, "Select Barangay");
      barangaySelect.disabled = true;

      const selectedValue = provinceSelect.value;
      if (!selectedValue) {
        citySelect.disabled = true;
        return;
      }

      let matches;
      if (selectedValue === "NCR") {
        // In the source data, NCR cities are represented as province-level
        // entries, so match their geographic code rather than province_id.
        matches = cities.filter(c => String(c.code).padStart(9, "0").startsWith("13"));
      } else {
        const provinceId = Number(selectedValue);
        matches = cities.filter(c => Number(c.province_id) === provinceId);
      }

      matches.sort((a, b) => a.description.localeCompare(b.description));

      matches.forEach(c => {
        const option = document.createElement("option");
        option.value = String(c.muncity_id);
        option.textContent = c.description;
        citySelect.appendChild(option);
      });

      citySelect.disabled = matches.length === 0;
    });

    citySelect.addEventListener("change", () => {
      reset(barangaySelect, "Select Barangay");
      const cityId = Number(citySelect.value);

      if (!cityId) {
        barangaySelect.disabled = true;
        return;
      }

      const matches = barangays
        .filter(b => Number(b.muncity_id) === cityId)
        .sort((a, b) => a.description.localeCompare(b.description));

      matches.forEach(b => {
        const option = document.createElement("option");
        option.value = String(b.barangay_id);
        option.textContent = b.description;
        barangaySelect.appendChild(option);
      });

      barangaySelect.disabled = matches.length === 0;
    });

    // Preselect our main location
    provinceSelect.value = "NCR";
    provinceSelect.dispatchEvent(new Event("change"));

    citySelect.value = "1307";
    citySelect.dispatchEvent(new Event("change"));

    barangaySelect.value = "35579";
  } catch (error) {
    console.error("Address dropdown error:", error);
    alert("Unable to load the address list. Check the ./data/ folder and run the website with Live Server.");
  }
});
