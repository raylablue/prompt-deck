import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';

function PageCards() {
  const [cardData, setCardData] = React.useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.uid;

  React.useEffect(() => {
    async function getCards() {
      const cards = await firebase.db
        .collection('cards')
        .where('createdBy', '==', userId)
        .get();

      const cardList = cards.docs.map((card) => {
        const data = card.data();
        console.log(data.createdBy);
        const cardId = card.id;
        const cardValue = [data, cardId];

        return cardValue;
      });
      setCardData(cardList);
    }

    getCards();
  }, [userId]);

  if (cardData.length <= 0) {
    return (
      <TemplateDefault>
        <div>
          <p>
            You don&apos;t have any cards, go make some!
          </p>
          <button type="button">
            <Link to="/create-cards">
              Create Cards
            </Link>
          </button>
        </div>
      </TemplateDefault>
    );
  }
  return (
    <TemplateDefault>
      <div data-test="page-cards">
        <h1>Cards Page</h1>

        <div className="row" data-test="card-component">
          {cardData.map((card) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4"
              key={card[1]}
            >

              <div
                className="p-3 mb-4 border border-dark"
              >
                <h3>{card[0].cardTitle}</h3>
                <h4>{card[0].type}</h4>
                <ol>
                  <li>{card[0].side1}</li>
                  <li>{card[0].side2}</li>
                  <li>{card[0].side3}</li>
                  <li>{card[0].side4}</li>
                </ol>

              </div>
            </div>
          ))}
        </div>

      </div>
    </TemplateDefault>
  );
}

export default PageCards;
