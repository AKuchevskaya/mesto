
export class Section {
    //constructor({ items, renderer }, containerSelector) {
    constructor({ renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector)
        this._renderer = renderer
    }
    renderItems = (items) => {
        items.forEach(data => {
            this._renderer(data)
        })
    }
    
    addItem = (element) => {
        this._container.prepend(element)
    }
}

