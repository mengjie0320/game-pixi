export class Card {
    title: string;
    desc: string;

    constructor(title: string, desc: string) {
        this.title = title;
        this.desc = desc;
    }

    genElement() {
        const card = document.createElement('div');
        const title = document.createElement('h2');
        title.innerHTML = this.title;
        const desc = document.createElement('div');
        desc.className = 'desc';  // 添加desc类名
        desc.innerHTML = this.desc;

        console.log('1');
        card.appendChild(title)
        card.appendChild(desc);
        card.className = 'card';  // 添加desc类名
        return card;
    }
}
