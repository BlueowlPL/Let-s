class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById("cart-notification");
    this.header = document.querySelector("sticky-header");
    this.onBodyClick = this.handleBodyClick.bind(this);

    this.notification.addEventListener(
      "keyup",
      (evt) => evt.code === "Escape" && this.close()
    );
    this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
      closeButton.addEventListener("click", this.close.bind(this))
    );
  }

  open() {
    this.notification.classList.add("animate", "active");

    this.notification.addEventListener(
      "transitionend",
      () => {
        this.notification.focus();
        trapFocus(this.notification);
      },
      { once: true }
    );

    document.body.addEventListener("click", this.onBodyClick);
  }

  close() {
    this.notification.classList.remove("active");
    document.body.removeEventListener("click", this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  renderContents(parsedState) {
    this.cartItemKey = parsedState.key;
    this.getSectionsToRender().forEach((section) => {
      document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(
        parsedState.sections[section.id],
        section.selector
      );
    });

    if (this.header) this.header.reveal();
    this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: "cart-notification-product",
        selector: `[id="cart-notification-product-${this.cartItemKey}"]`,
      },
      {
        id: "cart-notification-button",
      },
      {
        id: "cart-icon-bubble",
      },
    ];
  }

  getSectionInnerHTML(html, selector = ".shopify-section") {
    return new DOMParser()
      .parseFromString(html, "text/html")
      .querySelector(selector).innerHTML;
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest("cart-notification")) {
      const disclosure = target.closest("details-disclosure, header-menu");
      this.activeElement = disclosure
        ? disclosure.querySelector("summary")
        : null;
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define("cart-notification", CartNotification);

const testArray = [
  "MUST HAVE",
  "POMYSŁ NA PREZENT",
  "ZESTAWY",
  "WSZYSTKIE PRODUKTY",
  "MUST HAVE22",
  "MUST HAVE22",
  "MUST HAVE22",
  "MUST HAVE22",
  "MUST HAVE22",
  "MUST HAVE22",
  "MUST HAVE22",
  "MUST HAVE22",
  "POMYSŁ NA PREZENT22",
  "ZESTAWY22",
];

const hamburgerIcon = document.getElementById("icon-hamburger");
const closeIcon = document.getElementById("icon-close");
const dropDown = document.getElementById("dropdown-menu");
const chevrons = document.getElementsByClassName("chevron-down");
const chevronsRight = document.getElementById("chevrons-right");
const mobileFooterLinks = document.getElementById("mobile-footer-links");
let direction = "RIGHT";
let currentIndex = 0;
let actualPos = 0;
const toogleClasses = () => {
  closeIcon.classList.toggle("active");
  hamburgerIcon.classList.toggle("active");
  dropDown.classList.toggle("active");
};

Array.from(chevrons).forEach(function (element) {
  element.addEventListener("click", (e) => {
    const chevron = e.currentTarget;
    chevron.closest("div").nextSibling.classList.toggle("expand");

    chevron.classList.toggle("active");
  });
});

hamburgerIcon.addEventListener("click", toogleClasses);
closeIcon.addEventListener("click", toogleClasses);
chevronsRight.addEventListener("click", () => {
  if (currentIndex === mobileFooterLinks.children.length - 1) {
    direction = "LEFT";
  }
  if (currentIndex === 0) direction = "RIGHT";
  if (direction === "RIGHT") {
    mobileFooterLinks.style.transform = `translate(-${
      actualPos + mobileFooterLinks.children[currentIndex + 1].offsetWidth
    }px)`;
    actualPos += mobileFooterLinks.children[currentIndex + 1].offsetWidth;
    currentIndex += 1;
    if (currentIndex === mobileFooterLinks.children.length - 1) {
      chevronsRight.classList.toggle("active");
    }
  }
  if (direction === "LEFT") {
    mobileFooterLinks.style.transform = `translate(-${
      actualPos - mobileFooterLinks.children[currentIndex - 1].offsetWidth
    }px)`;
    actualPos -= mobileFooterLinks.children[currentIndex - 1].offsetWidth;
    currentIndex -= 1;
    if (currentIndex === 0) chevronsRight.classList.toggle("active");
  }
});
const formFooterLinksDom = () => {
  let tripleArr = [];
  testArray.forEach((text) => {
    tripleArr.push(text);
    if (tripleArr.length === 3) {
      const div = document.createElement("div");
      div.classList.add("mobile-footer-links-cluster");
      div.style.width = `${
        document.getElementsByClassName("mobile-footer-links-container")[0]
          .clientWidth
      }px`;
      tripleArr.forEach((text) => {
        const li = document.createElement("li");
        li.innerText = text;
        div.appendChild(li);
      });
      mobileFooterLinks.appendChild(div);
      tripleArr = [];
    }
  });
  if (tripleArr.length) {
    const div = document.createElement("div");
    div.classList.add("mobile-footer-links-cluster");

    div.style.width = `${
      document.getElementsByClassName("mobile-footer-links-container")[0]
        .clientWidth
    }px`;
    tripleArr.forEach((text) => {
      const li = document.createElement("li");
      li.innerText = text;
      div.appendChild(li);
    });
    mobileFooterLinks.appendChild(div);
    tripleArr = [];
  }
};

window.addEventListener("DOMContentLoaded", () => formFooterLinksDom());
