const CART_KEY = "famais_premium_cart_v1";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let products = DEFAULT_PRODUCTS.map((product) => ({ ...product }));
let cart = loadCart();
let activeCategory = "Todos";
let selectedProductId = null;
let lastFocusedElement = null;

function loadCart() {
    try {
        const storedCart = JSON.parse(localStorage.getItem(CART_KEY));

        if (!Array.isArray(storedCart)) return [];

        return storedCart.filter((id) =>
            Number.isInteger(id) && DEFAULT_PRODUCTS.some((product) => product.id === id)
        );
    } catch {
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
        showToast("Não foi possível salvar sua seleção neste navegador");
    }
}

function brl(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function productPrice(product) {
    return product.price ? brl(product.price) : "Preço sob consulta";
}

function uniqueCategories() {
    return [...new Set(products.map((product) => product.category))];
}

function productCountByCategory(category) {
    if (category === "Todos") {
        return products.length;
    }

    return products.filter(
        (product) => product.category === category
    ).length;
}

function debounce(callback, delay = 250) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

function resetCatalog() {
    activeCategory = "Todos";

    $("#catalogSearch").value = "";
    $("#globalSearch").value = "";
    $("#sortProducts").value = "featured";

    renderFilters();
    renderProducts();
}

function renderCategories() {
    const cards = uniqueCategories()
        .map((category) => {
            const product = products.find(
                (item) => item.category === category
            );

            if (!product) {
                return null;
            }

            return {
                category: category,
                image: product.image,
                count: productCountByCategory(category),
            };
        })
        .filter(Boolean);

    $("#categoryCards").innerHTML = cards
        .map((item) => `
            <button
                class="category-card"
                data-category-card="${item.category}"
                type="button"
            >
                <img
                    src="${item.image}"
                    alt="Móveis da categoria ${item.category}"
                    loading="lazy"
                    decoding="async"
                >

                <span>
                    ${item.category}

                    <small>
                        ${item.count}
                        ${item.count === 1 ? "modelo" : "modelos"}
                    </small>
                </span>
            </button>
        `)
        .join("");

    $$("[data-category-card]").forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.categoryCard;

            renderFilters();
            renderProducts();

            $("#colecao").scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

function renderFilters() {
    const categories = [
        "Todos",
        ...uniqueCategories()
    ];

    $("#filters").innerHTML = categories
        .map((category) => {
            const count = productCountByCategory(category);

            const activeClass =
                activeCategory === category
                    ? "active"
                    : "";

            return `
                <button
                    class="filter-chip ${activeClass}"
                    data-filter="${category}"
                    type="button"
                    aria-pressed="${activeCategory === category}"
                >
                    ${category}
                    <span>${count}</span>
                </button>
            `;
        })
        .join("");

    $$("[data-filter]").forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.filter;

            renderFilters();
            renderProducts();
        });
    });
}

function getVisibleProducts() {
    const query = (
        $("#catalogSearch").value ||
        $("#globalSearch").value ||
        ""
    ).trim().toLowerCase();

    let filtered = products.filter((product) => {
        const categoryOk = activeCategory === "Todos" || product.category === activeCategory;
        const searchOk = !query || [
            product.name,
            product.category,
            product.description,
        ].join(" ").toLowerCase().includes(query);

        return categoryOk && searchOk;
    });

    const sort = $("#sortProducts").value;

    if (sort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    } else if (sort === "stock") {
        filtered.sort((a, b) => b.stock - a.stock);
    } else {
        filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return filtered;
}

function renderProducts() {
    const list = getVisibleProducts();

    $("#catalogCount").textContent = list.length === 1
        ? "1 produto encontrado"
        : `${list.length} produtos encontrados`;

    const hasSearch = Boolean(
        $("#catalogSearch").value.trim() ||
        $("#globalSearch").value.trim()
    );

    const hasActiveFilter =
        activeCategory !== "Todos" ||
        hasSearch ||
        $("#sortProducts").value !== "featured";

    $("#clearCatalog").hidden = !hasActiveFilter;

    $("#productGrid").innerHTML = list.length
        ? list.map((product) => `
            <article class="product-card">
                <button
                    class="product-media"
                    data-view="${product.id}"
                    type="button"
                    aria-label="Ver detalhes de ${product.name}"
                >
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        decoding="async"
                    >
                    ${product.featured ? '<span class="product-badge">DESTAQUE</span>' : ""}
                </button>

                <div class="product-body">
                    <div class="product-topline">
                        <span>${product.category}</span>
                        <span>${product.stock} em estoque</span>
                    </div>

                    <h3>${product.name}</h3>
                    <p>${product.description}</p>

                    <div class="product-bottom">
                        <span class="price">${productPrice(product)}</span>

                        <div class="product-actions">
                            <button class="small-button" data-view="${product.id}" type="button">
                                Detalhes
                            </button>
                            <button class="small-button primary" data-add="${product.id}" type="button">
                                Selecionar
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `).join("")
        : `
            <div class="catalog-empty">
                <strong>Nenhum produto encontrado</strong>
                <p>
                    Tente outro nome ou limpe os filtros para
                    visualizar toda a coleção.
                </p>
                <button class="btn btn-dark" type="button" data-reset-catalog>
                    Ver todos os produtos
                </button>
            </div>
        `;

    $$("[data-view]").forEach((element) => {
        element.addEventListener("click", () => openProduct(Number(element.dataset.view)));
    });

    $$("[data-add]").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            addToCart(Number(button.dataset.add));
        });
    });
    const emptyResetButton = $("[data-reset-catalog]");

    if (emptyResetButton) {
        emptyResetButton.addEventListener("click", resetCatalog);
    }
}

function openProduct(id) {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    selectedProductId = id;
    $("#modalImage").src = product.image;
    $("#modalImage").alt = product.name;
    $("#modalCategory").textContent = product.category;
    $("#modalName").textContent = product.name;
    $("#modalDescription").textContent = product.description;
    $("#modalStock").textContent = `${product.stock} unidade(s) disponíveis para consulta`;
    $("#modalPrice").textContent = productPrice(product);

    lastFocusedElement = document.activeElement;
    $("#productModal").classList.add("open");
    $("#productModal").setAttribute("aria-hidden", "false");
    $("#productModal").removeAttribute("inert");
    updatePageLock();
    $("#closeProductModal").focus();
}

function closeProduct() {
    $("#productModal").classList.remove("open");
    $("#productModal").setAttribute("aria-hidden", "true");
    $("#productModal").setAttribute("inert", "");
    selectedProductId = null;
    updatePageLock();

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

function addToCart(id) {
    if (!cart.includes(id)) {
        cart.push(id);
        saveCart();
    }
    renderCart();
    showToast("Produto adicionado à sua seleção");
}

function removeFromCart(id) {
    cart = cart.filter((itemId) => itemId !== id);
    saveCart();
    renderCart();
}

function renderCart() {
    const selected = cart
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean);

    $("#cartCount").textContent = selected.length;

    $("#cartItems").innerHTML = selected.length ? selected.map((product) => `
        <article class="cart-item">
            <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
            <div>
                <h4>${product.name}</h4>
                <small>${product.category} · ${productPrice(product)}</small>
            </div>
            <button
                data-remove="${product.id}"
                type="button"
                aria-label="Remover ${product.name} da seleção"
            >×</button>
        </article>
    `).join("") : "<p>Sua seleção está vazia. Escolha os produtos que deseja consultar.</p>";

    $$("[data-remove]").forEach((button) => {
        button.addEventListener("click", () => removeFromCart(Number(button.dataset.remove)));
    });
}

function updatePageLock() {
    const hasOpenOverlay =
        $("#cartDrawer").classList.contains("open") ||
        $("#productModal").classList.contains("open");

    document.body.classList.toggle("overlay-open", hasOpenOverlay);
}

function openCart() {
    lastFocusedElement = document.activeElement;
    $("#cartDrawer").classList.add("open");
    $("#cartBackdrop").classList.add("open");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    $("#cartDrawer").removeAttribute("inert");
    updatePageLock();
    $("#closeCart").focus();
}

function closeCart() {
    const wasOpen = $("#cartDrawer").classList.contains("open");

    $("#cartDrawer").classList.remove("open");
    $("#cartBackdrop").classList.remove("open");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    $("#cartDrawer").setAttribute("inert", "");
    updatePageLock();

    if (wasOpen && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

function requestQuote() {
    const selected = cart
        .map((id) => products.find((product) => product.id === id))
        .filter(Boolean);

    if (!selected.length) {
        showToast("Adicione pelo menos um produto");
        return;
    }

    const lines = selected.map((product, index) =>
        `${index + 1}. ${product.name} - ${product.category}`
    );

    const message = [
        "Olá! Gostaria de solicitar um orçamento dos seguintes produtos Famais:",
        "",
        ...lines,
        "",
        "Pode me informar valores, acabamentos e prazo de entrega?"
    ].join("\n");

    window.open(
        `https://wa.me/5544991255235?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
    );
}

function toggleSearch(forceOpen) {
    const panel = $("#searchPanel");
    const shouldOpen = typeof forceOpen === "boolean"
        ? forceOpen
        : !panel.classList.contains("open");

    panel.classList.toggle("open", shouldOpen);
    panel.setAttribute("aria-hidden", String(!shouldOpen));
    $("#searchToggle").setAttribute("aria-expanded", String(shouldOpen));

    if (shouldOpen) {
        $("#globalSearch").focus();
    }
}

function toggleMobileMenu(forceOpen) {
    const menu = $("#mobileMenu");
    const shouldOpen = typeof forceOpen === "boolean"
        ? forceOpen
        : !menu.classList.contains("open");

    menu.classList.toggle("open", shouldOpen);
    menu.setAttribute("aria-hidden", String(!shouldOpen));
    $("#menuButton").setAttribute("aria-expanded", String(shouldOpen));
}

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    closeCart();
    closeProduct();
    toggleSearch(false);
    toggleMobileMenu(false);
});

function renderAll() {
    renderCategories();
    renderFilters();
    renderProducts();
    renderCart();
}

const debouncedRenderProducts = debounce(renderProducts);

$("#catalogSearch").addEventListener("input", () => {
    $("#globalSearch").value =
        $("#catalogSearch").value;

    debouncedRenderProducts();
});

$("#sortProducts").addEventListener(
    "change",
    renderProducts
);

$("#globalSearch").addEventListener("input", () => {
    $("#catalogSearch").value =
        $("#globalSearch").value;

    debouncedRenderProducts();
});

$("#clearCatalog").addEventListener(
    "click",
    resetCatalog
);

$("#searchToggle").addEventListener("click", () => toggleSearch());
$("#closeSearch").addEventListener("click", () => toggleSearch(false));

$("#menuButton").addEventListener("click", () => toggleMobileMenu());
$$(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => toggleMobileMenu(false));
});

$("#cartButton").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#cartBackdrop").addEventListener("click", closeCart);
$("#quoteButton").addEventListener("click", requestQuote);

$("#closeProductModal").addEventListener("click", closeProduct);
$("#productModal").addEventListener("click", (event) => {
    if (event.target === $("#productModal")) closeProduct();
});
$("#modalAdd").addEventListener("click", () => {
    if (selectedProductId) addToCart(selectedProductId);
    closeProduct();
    openCart();
});

$("#contactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const message = [
        "Olá! Gostaria de atendimento sobre os móveis Famais.",
        "",
        `Nome: ${$("#contactName").value}`,
        `E-mail: ${$("#contactEmail").value}`,
        `Telefone: ${$("#contactPhone").value}`,
        `Mensagem: ${$("#contactMessage").value || "Gostaria de mais informações."}`
    ].join("\n");

    window.open(
        `https://wa.me/5544991255235?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
    );
});

renderAll();
