export interface User {
    id: string;
    name: string;
    username: string
}

export class UserTableBuilder {
    private readonly data: User[];
    private readonly rootElement: HTMLElement;

    public constructor(data: User[], rootElement: HTMLElement) {
        this.data = data;
        this.rootElement = rootElement;
    }

    build(): HTMLElement {
        let tableContent = '';
        for (let i = 0; i < this.data.length; i += 1) {
            const item = this.data[i];

            tableContent += `
                <tr class="gr-table__body-row">
                  <td class="gr-table__body-content">${item.id}</td>
                  <td class="gr-table__body-content">${item.name}</td>
                  <td class="gr-table__body-content">${item.username}</td>
                </tr>
            `;
        }

        const tableHtml = `
            <table class="gr-table">
                <thead class="gr-table__header">
                    <tr>
                        <th class="gr-table__header-content">ID</th>
                        <th class="gr-table__header-content">Name</th>
                        <th class="gr-table__header-content">Username</th>
                    </tr>
                </thead>
                <tbody class="gr-table__body">${tableContent}</tbody>
            </table>
        `;

        this.rootElement.innerHTML = tableHtml;
        return this.rootElement.firstElementChild as HTMLElement;
    }
}
