export class ListBuilder {
    private readonly title: string;
    private readonly data: string[];
    private readonly rootElement: HTMLElement;

    public constructor(title: string, data: string[], rootElement: HTMLElement) {
        this.title = title;
        this.data = data;
        this.rootElement = rootElement;
    }

    build(): HTMLElement {
        let listElementsHtml = '';
        for (let i = 0; i < this.data.length; i += 1) {
            listElementsHtml += `<li class="ls-list-element">${ this.data[i] }</li>`;
        }

        const listHtml = `
            <div class="ls-wrapper">
                <h1 class="ls-title">${ this.title }</h1>
                <ul class="ls-list">${ listElementsHtml }</ul>
            </div>
        `;

        this.rootElement.innerHTML = listHtml;
        return this.rootElement.firstElementChild as HTMLElement;
    }
}
