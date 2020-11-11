import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from './components/authentication/LoginForm'
import SignUpForm from './components/authentication/SignUpForm'
import NavBar from './components/NavBar';
import NotFound from './components/NotFound'
import CocktailDetailPage from './components/cocktail/CocktailDetailPage'
import CocktailSearchResults from './components/cocktail/CocktailSearchResults';
import HomePage from './components/HomePage'
import { loadAllIngredients } from './store/ingredients'
import { loadCocktailTags } from './store/cocktails'
import AllCocktails from './components/cocktail/AllCocktails'
import MyBar from './components/MyBar'
import { load_mybar, load_favorites } from './store/bar'

function App() {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadAllIngredients())
        dispatch(loadCocktailTags())
        dispatch(load_mybar())
        dispatch(load_favorites())
    // eslint-disable-next-line
    }, [])

        return (
            <BrowserRouter>
            <NavBar />
                <Switch>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/signup" component={SignUpForm} />
                    <Route exact path="/myBar" component={MyBar} />
                    <Route exact path="/ingredients/search" component={HomePage} />
                    <Route exact path="/cocktails/search/:query" component={CocktailSearchResults}/>
                    <Route exact path="/cocktails/all/:page" component={AllCocktails}/>
                    <Route exact path="/cocktails/:cocktail" component={CocktailDetailPage} />
                    <Route path="/404" component={NotFound} />
                    <Route exact path="/"><Redirect to="/cocktails/all/1" /></ Route>
                </Switch>
        </BrowserRouter>
    );
}

export default App;
