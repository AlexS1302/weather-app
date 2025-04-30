
// Create an element
function createElement(tag, classes = [], text = "", datasets = {}) {
    const element = document.createElement(tag);
    element.classList.add(...classes),
    element.textContent = text;

    for (const [key, value] of Object.entries(datasets)) {
        element.dataset[key] = value
    }

    return element;
}

// Append the element to a container
function appendToContainer(parent, element) {
    const container = document.querySelector(parent);
    if (container) container.appendChild(element);
}

export {createElement, appendToContainer}


