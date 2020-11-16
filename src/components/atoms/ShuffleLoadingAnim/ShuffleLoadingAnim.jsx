import React from 'react';
import './ShuffleLoadingAnim.scss';

function ShuffleLoadingAnim() {
  return (
    <div className="flickity-container">
      <div className="hand">
        <div className="card card-1"><span /></div>
        <div className="card card-2"><span /></div>
        <div className="card card-3"><span /></div>
      </div>
    </div>
  );
}

// This component was adjusted from the codepen "card shuffle" loading animation by Jacob Harris
// https://codepen.io/ahoy/pen/RpEyLL

export default ShuffleLoadingAnim;
