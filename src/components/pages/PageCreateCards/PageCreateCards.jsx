import React from 'react';
import TemplateDefault from '../../Templates/TemplateDefault';

function PageCreateCards() {
  return (
    <TemplateDefault>
      <div
        data-test="page-create-cards"
      >
        <h1>Create Cards Page</h1>
        <form>
          <label>Name:&nbsp;
            <input
              data-test=""
              className=""
              type="text"
              placeholder="card name"
              value=""
              onChange=""
            />
          </label>
        </form>
      </div>
    </TemplateDefault>
  );
}

export default PageCreateCards;
