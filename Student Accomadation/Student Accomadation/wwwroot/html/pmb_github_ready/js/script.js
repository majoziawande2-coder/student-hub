// ==========================================
// PMB STUDENT HUB
// DEMO ACCOMMODATION DATA
// ==========================================

const listings = [

    {
        id: 1,

        name: "The Scottsville Student House",

        area: "Scottsville",

        price: 4200,

        room: "Single Room",

        type: "Student House",

        emoji: "🏡",

        image: "image-one",

        features: [
            "Wi-Fi",
            "Water included",
            "Parking"
        ],

        distance: "1.2 km from campus",

        desc:
            "A bright, social student house close to shops, transport and campus routes."
    },


    {
        id: 2,

        name: "College Road Residence",

        area: "College Road",

        price: 5100,

        room: "Single Room",

        type: "Residence",

        emoji: "🏢",

        image: "image-two",

        features: [
            "Wi-Fi",
            "Laundry",
            "24/7 security"
        ],

        distance: "0.8 km from campus",

        desc:
            "Modern student rooms with shared communal spaces and convenient access to town."
    },


    {
        id: 3,

        name: "Berea Shared Living",

        area: "Berea",

        price: 3300,

        room: "Shared Room",

        type: "Shared House",

        emoji: "🏠",

        image: "image-three",

        features: [
            "Wi-Fi",
            "Furnished",
            "Kitchen"
        ],

        distance: "2.4 km from campus",

        desc:
            "Affordable shared living for students who want a friendly house environment."
    },


    {
        id: 4,

        name: "Hayfields Student Village",

        area: "Hayfields",

        price: 6200,

        room: "Single Room",

        type: "Student Village",

        emoji: "🏘️",

        image: "image-four",

        features: [
            "Wi-Fi",
            "Parking",
            "Study area"
        ],

        distance: "3.1 km from campus",

        desc:
            "A quieter option with private rooms, study spaces and secure parking."
    },


    {
        id: 5,

        name: "Town Bush House",

        area: "Town Bush",

        price: 3800,

        room: "Shared Room",

        type: "House",

        emoji: "🌳",

        image: "image-five",

        features: [
            "Furnished",
            "Water included",
            "Garden"
        ],

        distance: "2.0 km from campus",

        desc:
            "Relaxed house-style student accommodation with a homely feel."
    },


    {
        id: 6,

        name: "CBD Student Lofts",

        area: "PMB CBD",

        price: 5900,

        room: "Single Room",

        type: "Loft",

        emoji: "🏙️",

        image: "image-six",

        features: [
            "Wi-Fi",
            "Furnished",
            "Security"
        ],

        distance: "1.0 km from campus",

        desc:
            "Central student lofts for students who want shops, transport and entertainment nearby."
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentListings = [...listings];


// Get saved favourites from browser

let favourites =
    JSON.parse(
        localStorage.getItem("pmbFavourites") || "[]"
    );


// ==========================================
// DISPLAY LISTINGS
// ==========================================

function renderListings(items = currentListings) {

    const grid =
        document.getElementById("listingGrid");

    const empty =
        document.getElementById("noResults");


    grid.innerHTML = "";


    if (items.length === 0) {

        empty.classList.remove("hidden");

        return;
    }


    empty.classList.add("hidden");


    items.forEach(item => {

        const saved =
            favourites.includes(item.id);


        const card =
            document.createElement("article");


        card.className =
            "listing-card";


        card.innerHTML = `

            <div class="property-image ${item.image}">

                <span class="tag">
                    ${item.type}
                </span>


                <button
                    class="heart ${saved ? "active" : ""}"
                    aria-label="Save ${item.name}"
                    onclick="toggleFavourite(${item.id})">

                    ${saved ? "♥" : "♡"}

                </button>


                <span>
                    ${item.emoji}
                </span>

            </div>


            <div class="card-body">

                <h3>
                    ${item.name}
                </h3>


                <div class="location">

                    📍 ${item.area}
                    •
                    ${item.distance}

                </div>


                <div class="meta">

                    ${item.features
                .map(
                    feature =>
                        `<span>${feature}</span>`
                )
                .join("")
            }

                </div>


                <div class="price-row">

                    <div class="price">

                        <strong>
                            R${item.price.toLocaleString()}
                        </strong>

                        <small>
                            / month
                        </small>

                    </div>


                    <button
                        class="details-btn"
                        onclick="showDetails(${item.id})">

                        View details →

                    </button>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}


// ==========================================
// SEARCH & FILTER
// ==========================================

function filterListings() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const room =
        document.getElementById("roomFilter").value;


    const price =
        Number(
            document.getElementById("priceFilter").value
            || Infinity
        );


    currentListings =
        listings.filter(item => {

            const searchableText = `

                ${item.name}

                ${item.area}

                ${item.room}

                ${item.type}

                ${item.features.join(" ")}

            `.toLowerCase();


            return (

                searchableText.includes(search)

                &&

                (!room ||
                    item.room === room)

                &&

                item.price < price

            );

        });


    sortListings(false);

}


// ==========================================
// SORT
// ==========================================

function sortListings(applyFilter = true) {

    if (applyFilter) {

        filterListings();

        return;

    }


    const sort =
        document.getElementById("sortSelect").value;


    if (sort === "low") {

        currentListings.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sort === "high") {

        currentListings.sort(
            (a, b) => b.price - a.price
        );

    }


    renderListings();

}


// ==========================================
// CLEAR FILTERS
// ==========================================

function clearFilters() {

    document.getElementById("searchInput").value = "";

    document.getElementById("roomFilter").value = "";

    document.getElementById("priceFilter").value = "";

    document.getElementById("sortSelect").value =
        "recommended";


    currentListings =
        [...listings];


    renderListings();

}


// ==========================================
// FAVOURITES
// ==========================================

function toggleFavourite(id) {

    if (favourites.includes(id)) {

        favourites =
            favourites.filter(
                favouriteId =>
                    favouriteId !== id
            );

    } else {

        favourites.push(id);

    }


    localStorage.setItem(
        "pmbFavourites",

        JSON.stringify(favourites)
    );


    renderListings();

}


// ==========================================
// PROPERTY DETAILS
// ==========================================

function showDetails(id) {

    const item =
        listings.find(
            listing => listing.id === id
        );


    document.getElementById("modalContent")
        .innerHTML = `

        <div class="modal-emoji">

            ${item.emoji}

        </div>


        <span class="eyebrow">

            ${item.type.toUpperCase()}

        </span>


        <h2 id="modalTitle">

            ${item.name}

        </h2>


        <p>

            📍 ${item.area}
            •
            ${item.distance}

        </p>


        <div class="modal-details">

            <div>

                <small>
                    MONTHLY RENT
                </small>

                <strong>
                    R${item.price.toLocaleString()}
                </strong>

            </div>


            <div>

                <small>
                    ROOM TYPE
                </small>

                <strong>
                    ${item.room}
                </strong>

            </div>


            <div>

                <small>
                    AVAILABLE
                </small>

                <strong>
                    Demo availability
                </strong>

            </div>


            <div>

                <small>
                    LOCATION
                </small>

                <strong>
                    ${item.area}
                </strong>

            </div>

        </div>


        <p>

            ${item.desc}

        </p>


        <p>

            <strong>
                Features:
            </strong>

            ${item.features.join(" • ")}

        </p>


        <button
            class="btn btn-primary"
            onclick="showContact('${item.name.replaceAll("'", "\\'")}')">

            Enquire about this place

        </button>

    `;


    document
        .getElementById("modal")
        .classList.remove("hidden");

}


// ==========================================
// CONTACT PROVIDER
// ==========================================

function showContact(name) {

    document.getElementById("modalContent")
        .innerHTML = `

        <div class="modal-emoji">
            📩
        </div>


        <span class="eyebrow">
            DEMO ENQUIRY
        </span>


        <h2 id="modalTitle">

            Ask about ${name}

        </h2>


        <p>

            This demo would connect a student
            or parent directly with the
            accommodation provider.

        </p>


        <div class="modal-details">

            <div>

                <small>
                    EMAIL
                </small>

                <strong>
                    provider@example.com
                </strong>

            </div>


            <div>

                <small>
                    PHONE
                </small>

                <strong>
                    031 000 0000
                </strong>

            </div>

        </div>


        <button
            class="btn btn-dark"
            onclick="closeModal()">

            Close

        </button>

    `;

}


// ==========================================
// INFORMATION MODAL
// ==========================================

function showInfo() {

    document.getElementById("modalContent")
        .innerHTML = `

        <div class="modal-emoji">
            🚀
        </div>


        <span class="eyebrow">
            THE VISION
        </span>


        <h2 id="modalTitle">

            One place for PMB
            student accommodation.

        </h2>


        <p>

            The full platform could let students
            and parents search verified listings,
            compare rent and room types, check
            distance to universities, view photos,
            save favourites and send enquiries.

        </p>


        <p>

            <strong>
                Future features:
            </strong>

            Map search, verified providers,
            availability calendars, reviews,
            transport routes, applications and
            provider dashboards.

        </p>


        <button
            class="btn btn-primary"
            onclick="closeModal()">

            Got it!

        </button>

    `;


    document
        .getElementById("modal")
        .classList.remove("hidden");

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    document
        .getElementById("modal")
        .classList.add("hidden");

}


// ==========================================
// SCROLL TO LISTINGS
// ==========================================

function scrollToListings() {

    document
        .getElementById("homes")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// MOBILE MENU
// ==========================================

function toggleMenu() {

    const nav =
        document.querySelector(".nav nav");


    nav.classList.toggle(
        "mobile-open"
    );

}


// ==========================================
// ESCAPE KEY
// ==========================================

document.addEventListener(
    "keydown",

    event => {

        if (event.key === "Escape") {

            closeModal();

        }

    }

);


// ==========================================
// START WEBSITE
// ==========================================

renderListings();