export default class ProductItem extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        const template = document.getElementById(
            'product-item-template'
        ) as HTMLTemplateElement
        const content = template.content.cloneNode(true)

        this.appendChild(content)

        const product = JSON.parse(this.dataset.product as string)
        this.querySelector('h4')!.textContent = product.name
        this.querySelector('p.price')!.textContent =
            '$' + product.price.toFixed(2)
        this.querySelector('img')!.src = `src/images/products/${product.image}`
        this.querySelector('a')!.addEventListener('click', (event: Event) => {
            event.preventDefault()
            const target = event.target as HTMLElement

            if (target.tagName.toLowerCase() === 'button') {
                // TODO: Add to cart
            } else {
                window.app.router.go(`/product?id=${product.id}`)
            }
        })
    }
}

customElements.define('product-item', ProductItem)