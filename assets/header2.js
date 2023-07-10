const dropdownLinksTextArr = `{{dropdownLinksTextArr}}`.split(" ");
const dropdownLinksUrlsArr = `{{dropdownLinksUrlsArr}}`.split(" ");

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
console.log("dropdownLinksTestArr", dropdownLinksTextArr);
console.log("dropdownLinksUrlsArr", dropdownLinksUrlsArr);

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
  if (!dropdownLinksTextArr.length) return;
  let tripleArr = [];
  dropdownLinksTextArr.forEach((text, index) => {
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
        const a = document.createElement("a");
        a.innerText = text;
        a.href = dropdownLinksUrlsArr[index];
        li.appendChild(a);
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
      const index = dropdownLinksTextArr.findIndex(text);
      console.log("index", index);
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.innerText = text;
      a.href = dropdownLinksUrlsArr[index];
      console.log(a);
      li.appendChild(a);
      div.appendChild(li);
      mobileFooterLinks.appendChild(div);
    });
    tripleArr = [];
  }
};
window.addEventListener("DOMContentLoaded", () => formFooterLinksDom());
