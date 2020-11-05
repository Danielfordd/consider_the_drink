import React from 'react';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import { useDispatch, useSelector } from 'react-redux';
import { removeIngredientFromFilter } from '../store/ingredients'
import { load_results } from './../store/cocktails'

export default function FontAwesome({ ingredient }) {
  const dispatch = useDispatch()
  const filteredIngredients = useSelector(state => state.ingredients.filter)

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const handleClick = () => {
    dispatch(removeIngredientFromFilter(ingredient))
    // dispatch(load_results(filteredIngredients))
  }

  return (
      <div onClick={handleClick}>
        <Icon className="fas fa-times" />
      </div>
  );
}
