import React from "react";
function CountryItem(props) {
  const { title, checklevel1, setcheck } = props;
  return (
    <div className='col-sm-3'>
      <div className='quiz_card_area'>
        <input
          className='quiz_checkbox'
          type='checkbox'
          id={2}
          defaultValue={2}
          onClick={() => props.onClick(title)}
        />
        <div className='single_quiz_card'>
          <div className='quiz_card_content'>
            <div className='quiz_card_icon'>
              <div className='quiz_icon quiz_icon3' />
            </div>
            {/* end of quiz_card_media */}
            <div className='quiz_card_title'>
              <h3>
                <i className='fa fa-check' aria-hidden='true' /> {title}
              </h3>
            </div>
            {/* end of quiz_card_title */}
          </div>
          {/* end of quiz_card_content */}
        </div>
        {/* end of single_quiz_card */}
      </div>
      {/* end of quiz_card_area */}
    </div>
  );
}

export default CountryItem;
