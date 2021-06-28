import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Category from '../components/category/Category';
import Home from '../components/home/Home';
import Detail from '../components/detail/Detail';
import Checkout from '../components/checkout/CheckoutStripe';
import Wrapper from '../components/wrapper/Wrapper';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppRouter = () => (
  <BrowserRouter>
    <Wrapper>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/category/:sort" component={Category} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </Wrapper>
  </BrowserRouter>
)

export default AppRouter;