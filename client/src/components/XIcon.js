import React from 'react';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import { useDispatch } from 'react-redux';
import { removeIngredientFromFilter } from '../store/ingredients'
import { removeIngredientFromBar } from '../store/bar'

export default function FontAwesome({ ingredient, myBar }) {
  const dispatch = useDispatch()

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

  const handleMyBarClick = (e) => {
    dispatch(removeIngredientFromBar(ingredient))
  }

  if (myBar) {
    return (
      <div onClick={handleMyBarClick}>
        <Icon className="fas fa-times" />
      </div>
    )
  } else {
    return (
      <div onClick={handleClick}>
        <Icon className="fas fa-times" />
      </div>
    );
  }

}
