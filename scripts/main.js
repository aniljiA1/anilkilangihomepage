document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Product Data with LOCAL IMAGE FILE NAMES ---
  const productData = {
    Rings: [
      // Ensure these image names match the files in your /images/ folder
      {
        id: 1,
        name: "TWISTED PETAL GOLD BRACELET",
        price: "₹799044",
        image: "ring-1.jpg",
      },
      { id: 2, name: "ETERNAL KNOT RING", price: "₹5500", image: "ring-2.jpg" },
      { id: 3, name: "DAINTY SOLITAIRE", price: "₹9200", image: "ring-3.jpg" },
      { id: 4, name: "PEARL DROP RING", price: "₹4100", image: "ring-4.jpg" },
    ],
    Earrings: [
      {
        id: 5,
        name: "GOLDEN RADIANCE HOOPS",
        price: "₹6800",
        image: "earring-1.jpg",
      },
      {
        id: 6,
        name: "STAR GAZE STUDS",
        price: "₹3900",
        image: "earring-2.jpg",
      },
      {
        id: 7,
        name: "DIAMOND CLUSTER JHUMKA",
        price: "₹12500",
        image: "earring-3.jpg",
      },
      {
        id: 8,
        name: "MINIMAL SILVER HUGGIES",
        price: "₹2200",
        image: "earring-4.jpg",
      },
    ],
    Pendants: [
      {
        id: 9,
        name: "AQUAMARINE TEARDROP",
        price: "₹15000",
        image: "pendant-1.jpg",
      },
      {
        id: 10,
        name: "INITIAL PENDANT (GOLD)",
        price: "₹8900",
        image: "pendant-2.jpg",
      },
      {
        id: 11,
        name: "LUNAR CRESCENT",
        price: "₹7100",
        image: "pendant-3.jpg",
      },
      { id: 12, name: "OM PENDANT", price: "₹11000", image: "pendant-4.jpg" },
    ],
    Bracelets: [
      {
        id: 13,
        name: "SILVER CHAIN DELICATE",
        price: "₹4800",
        image: "bracelet-1.jpg",
      },
      { id: 14, name: "KADA BANGLE", price: "₹35000", image: "bracelet-2.jpg" },
      {
        id: 15,
        name: "PEARL & CHAIN",
        price: "₹9500",
        image: "bracelet-3.jpg",
      },
      {
        id: 16,
        name: "EVIL EYE BRACELET",
        price: "₹3100",
        image: "bracelet-4.jpg",
      },
    ],
  };

  const bestsellerTabs = document.querySelectorAll(".bestseller-tabs button");
  const productGrid = document.querySelector(".product-grid");

  const renderProducts = (category) => {
    const products = productData[category] || productData["Rings"];
    productGrid.innerHTML = products
      .map(
        (product) => `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image-container" style="background-image: url('./images/${product.image}');">
                    <button class="quick-view-btn">Quick View</button>
                </div>
                <p class="product-name">${product.name}</p>
                <p class="product-price">${product.price}</p>
            </div>
        `
      )
      .join("");
  };

  bestsellerTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      bestsellerTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      const category = this.getAttribute("data-category");
      renderProducts(category);
    });
  });

  // Initial load: Render 'Rings'
  renderProducts("Rings");

  // --- 2. Mobile Footer Accordion ---
  if (window.innerWidth <= 768) {
    const linkGroups = document.querySelectorAll(".footer-links .link-group");

    linkGroups.forEach((group) => {
      const heading = group.querySelector("h4");
      const list = group.querySelector("ul");

      heading.addEventListener("click", () => {
        const isActive = group.classList.contains("active");

        linkGroups.forEach((g) => {
          if (g !== group) {
            g.classList.remove("active");
            g.querySelector("ul").style.display = "none";
          }
        });

        if (isActive) {
          group.classList.remove("active");
          list.style.display = "none";
        } else {
          group.classList.add("active");
          list.style.display = "block";
        }
      });

      if (list) list.style.display = "none";
    });
  }

  // --- 3. Dynamic Header on Scroll ---
  const header = document.querySelector(".main-header");
  const mobileSearch = document.querySelector(".mobile-search-bar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Desktop/Global Scroll Class
    if (currentScrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Mobile Scroll Interaction (Hide/Show Header)
    if (window.innerWidth <= 768) {
      document.body.style.paddingTop = `${header.offsetHeight}px`;

      if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        header.style.transform = "translateY(0)";
      } else if (
        currentScrollY > lastScrollY &&
        currentScrollY > header.offsetHeight + mobileSearch.offsetHeight
      ) {
        // Scrolling down - hide header
        header.style.transform = "translateY(-100%)";
      }
    } else {
      document.body.style.paddingTop = "0";
    }

    lastScrollY = currentScrollY;
  });
});
