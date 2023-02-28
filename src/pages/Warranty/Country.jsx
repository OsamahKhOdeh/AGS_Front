import React from "react";
function CountryItem(props) {
  const { title, img, setcheck } = props;
  return (
    <div class='checkbox'>
      <label class='checkbox-wrapper'>
        <input
          type='checkbox'
          class='checkbox-input'
          onClick={() => props.onClick(title)}
        />
        <span class='checkbox-tile'>
          <img src={img} alt='' srcset='' className='logo__level1' />
        </span>
      </label>
    </div>
  );
}

export default CountryItem;
