
import { useCallback, useEffect, useState } from 'react';
import Card from './Components/Card';
import { getData } from './fetch';
import './style.css'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [items, setItems] = useState([]);

  const handleGetData = useCallback(() => {
    getData().then(data => {
      setItems(data);
    })
  }, []);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  function handleClick() {
    getData().then(data => {
      setItems(data);
    })
  }

  return (
    <div>
      <button type='button' className='btn btn-outline-primary' onClick={handleClick}>Refresh Compounds</button>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        {items.map((compound) => {
          return (
              <Card
                title={compound.title}
                subtitle={compound.subtitle}
                description={compound.description}
                image={compound.image}
              />
          )
        })}
      </div>
    </div>

  );
};

export default App;

