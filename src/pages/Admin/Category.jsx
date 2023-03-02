import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFiltersState } from "../../store/filtersSlice";
function Category(props) {
  const dispatch = useDispatch();
  const { title, img, checklevel1, setcheck } = props;
  const filters = useSelector((state) => state.filters.filters);
  return (
    <>
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
    </>
  );
}

export default Category;
