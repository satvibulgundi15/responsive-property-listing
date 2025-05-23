const form = document.getElementById('property-search');
const container = document.getElementById('properties-container');
let propertiesData = [];

// Fetch properties from local JSON file on initial load
async function fetchProperties() {
  const res = await fetch('http://127.0.0.1:8000/properties');
  propertiesData = await res.json();
  loadProperties();
}

// Load and filter properties based on the form
function loadProperties() {
  const type = form.querySelector('input[name="type"]:checked').value;
  const location = form.location.value.trim();
  const propertyType = form.property_type.value;
  const beds = form.beds.value;
  const baths = form.baths.value;
  const priceMin = parseInt(document.getElementById('price-min').value, 10);
  const priceMax = parseInt(document.getElementById('price-max').value, 10);

  let filtered = propertiesData.filter(p => {
    let match = true;
    if (type && p.type && p.type !== type) match = false;
    if (location && p.location && p.location.toLowerCase() !== location.toLowerCase()) match = false;
    if (propertyType && propertyType !== "" && p.property_type && p.property_type !== propertyType) match = false;
    if (beds && beds !== "Any" && Number(beds) !== p.beds) match = false;
    if (baths && baths !== "Any" && Number(baths) !== p.baths) match = false;
    if (priceMin && p.price < priceMin) match = false;
    if (priceMax && p.price > priceMax) match = false;
    return match;
  });
  renderProperties(filtered);
}

// Helper: Format price
function formatPrice(price, currency = 'Rs.') {
  if (price >= 10000000) return `${currency}${(price / 10000000).toFixed(1)}cr`;
  if (price >= 100000) return `${currency}${(price / 100000).toFixed(1)}L`;
  if (price >= 1000) return `${currency}${(price / 1000).toFixed(0)}k`;
  return `${currency}${price}`;
}

// Helper: Render tag
function renderTag(tag) {
  if (!tag) return '';
  let labelClass = '';
  let tagText = '';
  switch (tag.toLowerCase()) {
    case 'for sale': labelClass = 'for-sale'; tagText = 'FOR SALE'; break;
    case 'hot deal': labelClass = 'hot-deal'; tagText = 'HOT DEAL'; break;
    case 'long term rental': labelClass = 'long-term'; tagText = 'LONG TERM RENTAL'; break;
    default: labelClass = 'for-sale'; tagText = tag; break;
  }
  return `<span class="property-label ${labelClass}">${tagText}</span>`;
}

// Render property cards in screenshot style
function renderProperties(properties) {
  container.innerHTML = '';
  if (!properties.length) {
    container.innerHTML = '<p>No properties found.</p>';
    return;
  }
  let html = '<div class="property-listings row">';
  properties.forEach(p => {
    html += `
      <div class="col-md-4 mb-4">
        <div class="property-card">
          <div class="property-image-wrap position-relative">
            <!-- Property type strip (top left) -->
            <span class="property-strip property-type-strip position-absolute start-0 top-0 m-2">
              ${p.property_type ? p.property_type : 'Property'}
            </span>
            <!-- Rent/Buy strip (top right) -->
            <span class="property-strip property-action-strip position-absolute end-0 top-0 m-2">
              ${p.type ? p.type : ''}
            </span>
            <img src="${p.image}" class="property-image" alt="${p.title}">
            ${renderTag(p.tag)}
            <div class="property-price">
              <span class="price-main">${formatPrice(p.price, 'Rs.')}</span>
              <span class="price-sub">${p.price_sub || ''}</span>
            </div>
          </div>
          <div class="property-card-body">
            <div class="property-title-row">
              <h3 class="property-title">${p.title}</h3>
              <button class="info-btn" title="More Info">ℹ️</button>
            </div>
            <div class="property-location">${p.location}</div>
            <hr>
            <div class="property-meta-row">
              <div><b>Beds:</b> ${typeof p.beds === "number" && p.beds > 0 ? p.beds : 'N/A'}</div>
              <div><b>Baths:</b> ${typeof p.baths === "number" && p.baths > 0 ? p.baths : 'N/A'}</div>
              <div><b>Area:</b> <span class="meta-highlight">${p.area ? p.area + ' sqm' : 'N/A'}</span></div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// Listen for filter form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  loadProperties();
});

// On DOM ready, load all properties
document.addEventListener('DOMContentLoaded', fetchProperties);

// Optional: actions for icon/info buttons
container.addEventListener('click', e => {
  if (e.target.closest('.icon-btn')) {
    // Implement favorite or image modal logic here
  }
  if (e.target.closest('.info-btn')) {
    // Implement info modal logic here
  }
});

// ---- Price Range: sync number and range inputs ----
const priceMin = document.getElementById('price-min');
const priceMax = document.getElementById('price-max');
const priceMinInput = document.getElementById('price-min-input');
const priceMaxInput = document.getElementById('price-max-input');

function syncPriceInputs(trigger) {
  let min = Math.min(parseInt(priceMinInput.value), parseInt(priceMaxInput.value));
  let max = Math.max(parseInt(priceMinInput.value), parseInt(priceMaxInput.value));

  if (trigger === 'minInput' || trigger === 'minRange') {
    if (parseInt(priceMinInput.value) > parseInt(priceMaxInput.value)) priceMinInput.value = priceMaxInput.value;
    if (parseInt(priceMin.value) > parseInt(priceMax.value)) priceMin.value = priceMax.value;
  }
  if (trigger === 'maxInput' || trigger === 'maxRange') {
    if (parseInt(priceMaxInput.value) < parseInt(priceMinInput.value)) priceMaxInput.value = priceMinInput.value;
    if (parseInt(priceMax.value) < parseInt(priceMin.value)) priceMax.value = priceMin.value;
  }

  priceMin.value = priceMinInput.value = min;
  priceMax.value = priceMaxInput.value = max;
}

// Number input changes update slider
priceMinInput.addEventListener('input', () => syncPriceInputs('minInput'));
priceMaxInput.addEventListener('input', () => syncPriceInputs('maxInput'));
// Range slider changes update number input
priceMin.addEventListener('input', () => {
  priceMinInput.value = priceMin.value;
  syncPriceInputs('minRange');
});
priceMax.addEventListener('input', () => {
  priceMaxInput.value = priceMax.value;
  syncPriceInputs('maxRange');
});
syncPriceInputs();