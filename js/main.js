/*
===============================================================================
ACTIVE NAVIGATION HIGHLIGHTING
-------------------------------------------------------------------------------
This script updates the navigation bar to highlight the section currently being
viewed by the user.

Behavior:
- Uses a checkpoint positioned 40% down the viewport instead of the very top
of the page for more natural section detection
- Correctly handles smaller sections such as Skills and Contact
- Includes a bottom-of-page fallback so the last section can still activate
when the user scrolls to the end
===============================================================================
*/

/* Select all major sections that have an id attribute */
const sections = document.querySelectorAll("section[id]");

/* Select all navigation links that should receive the active state */
const navLinks = document.querySelectorAll(".nav-link");

/*
-------------------------------------------------------------------------------
Updates the active navigation link based on scroll position
-------------------------------------------------------------------------------
A checkpoint is placed at 40% of the viewport height. Whichever section
contains that checkpoint becomes the active section.

This approach works better than checking the very top of the page because:
- It feels more natural while scrolling
- It handles shorter sections more reliably
- It improves activation near the bottom of the page
-------------------------------------------------------------------------------
*/
function updateActiveNavLink() {
const checkpoint = window.scrollY + window.innerHeight * 0.4;
let currentSection = "";

sections.forEach(section => {
const sectionTop = section.offsetTop;
const sectionHeight = section.offsetHeight;
const sectionBottom = sectionTop + sectionHeight;

if (checkpoint >= sectionTop && checkpoint < sectionBottom) {
    currentSection = section.getAttribute("id");
}
});

/*
---------------------------------------------------------------------------
Bottom-of-page fallback
---------------------------------------------------------------------------
Ensures that the final section becomes active when the user scrolls near the
bottom of the page, even if that section is too short to fully cross the
viewport checkpoint.
---------------------------------------------------------------------------
*/
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
currentSection = sections[sections.length - 1].getAttribute("id");
}

/* Remove the active class from all nav links */
navLinks.forEach(link => {
link.classList.remove("active");

/* Add the active class only to the matching section link */
if (link.getAttribute("href") === `#${currentSection}`) {
    link.classList.add("active");
}
});
}

/*
-------------------------------------------------------------------------------
Event listeners
-------------------------------------------------------------------------------
Recalculate the active nav state when:
- the page scrolls
- the page first loads
- the browser window is resized
-------------------------------------------------------------------------------
*/
window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);
window.addEventListener("resize", updateActiveNavLink);