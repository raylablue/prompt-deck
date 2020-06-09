import React from 'react';
// import { useSelector } from 'react-redux';
import firebase from '../../../firebase/firebase';
import TemplateDefault from '../../Templates/TemplateDefault';

function PageCards() {
  const [cardData, setCardData] = React.useState([]);
  // const user = useSelector((state) => state.user);

  React.useEffect(() => {
    async function getCards() {
      const cards = await firebase.db
        .collection('cards')
        .get();

      const cardList = cards.docs.map((card) => card.data());
      return setCardData(cardList);
    }

    getCards();
  }, []);


  return (
    <TemplateDefault>
      <div
        data-test="page-cards"
      >
        <h1>Cards Page</h1>

        <div className="row">
          {cardData.map((card) => (
            <div className="col-sm-12 col-md-6 col-lg-4">

              <div
                key={card.documentId}
                className="p-3 mb-4 border border-dark"
              >
                <h3>{card.cardTitle}</h3>
                <h4>{card.type}</h4>
                <ol>
                  <li>{card.side1}</li>
                  <li>{card.side2}</li>
                  <li>{card.side2}</li>
                  <li>{card.side4}</li>
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
