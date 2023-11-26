/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
// import App from './App'
import { ProductList } from './Products';

const root = document.getElementById('root')

render(() => <ProductList />, root!)
