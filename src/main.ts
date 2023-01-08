import { Card } from './card';
import './card.scss';

const container = document.getElementById('container');
const cardList = [{
    title: 'A',
    desc: 'a'
}, {
    title: 'B',
    desc: 'b'
}]

cardList.forEach((cardInfo) => {
    const card = new Card(cardInfo.title, cardInfo.desc);
    const cardEle = card.genElement();
    container?.appendChild(cardEle);
})
