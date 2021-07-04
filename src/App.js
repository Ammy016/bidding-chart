import './App.css';
import CustomTable from './components/CustomTable';
import ShowAllBid from './components/ShowAllBid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import {BidProvider} from './BidContext'

function App() {
  return (
    <BidProvider>
      <Router>
        <Switch>
          <Route  path="/:id">
            <ShowAllBid />
          </Route>
          <Route exact path="/" >
              <CustomTable />
        </Route>
        </Switch>
      </Router>
    </BidProvider>
    
    
  );
}

export default App;
