import React from 'react';
import TemplateDefault from '../../Templates/TemplateDefault';

function PageCreateCards() {
  const [input, setInput] = React.useState('')
  return (
    <TemplateDefault>
      <div
        data-test="page-create-cards"
      >
        <h1>Create Cards Page</h1>
        <form>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            Name: &nbsp;
            <input
              data-test="card-name"
              type="text"
              placeholder="card name"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </label>
        </form>
      </div>
    </TemplateDefault>
  );
}

export default PageCreateCards;
