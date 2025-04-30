
// Create an element
function createElement(tag, classes = [], text = "", datasets = {}) {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    element.textContent = text;

    for (const [key, value] of Object.entries(datasets)) {
        element.dataset[key] = value
    }

    return element;
}

// Update an element
function updateElement(selector, attribute, value) {
    const element = document.querySelector(selector);
    if (element) {
        if (attribute in element) {
            element[attribute] = value;
        } else {
            element.setAttribute(attribute, value);
        }
    } else {
        console.warn(`Element not found for selector: ${selector}`);
    }
}

// Append the element to a container
function appendToContainer(parent, element) {
    const container = typeof parent === "string" ? document.querySelector(parent) : parent;
    if (container) {
        container.appendChild(element);
    } else {
        console.warn("Parent container not found/invalid")
    }
}

export {createElement, updateElement, appendToContainer}


