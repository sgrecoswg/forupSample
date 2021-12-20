import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import { FaArrowUp,FaArrowDown} from 'react-icons/fa';
import './App.css';

function App() {
  //set defaults
 const [symbolInput, setSymbolInput] = useState("");
 const [selectedStocks, setselectedStocks] = useState([]);
 const [errorMessage, setErrorMessage] = useState({show:false,message:""});

 let _availableStocks = [
    {
      id:1,
      name:"Alphabet INC CL",
      symbol:"GOOG",
      open:691.0,
      high:709.28,
      low:689.47,
      current:706.32
    },
    {
      id:2,
      name:"YAHOO! INC",
      symbol:"YHOO",
      open:29.28,
      high:29.66,
      low:29.06,
      current:29.27
    },
    {
      id:3,
      name:"Bookurama INC",
      symbol:"BOOK",
      open:291.28,
      high:291.66,
      low:291.06,
      current:291.27
    }
 ];
 /**
  * Adds a stock to the grid based on a symbol  *
  */
  const addSymbol = ()=>{
    //check to see if it validates, if not notify the user
    if(symbolInput && symbolInput.length > 1){
      //get stock info
      let _result = _availableStocks.find(x=>x.symbol.toLowerCase() === symbolInput.toLowerCase());

      //did we find something?, 
      //if not tell user it was not found and return. 
      if(!_result){
        setErrorMessage({show:true,message:"symbol was not found."});
        return;
      } 
        
      //if yes, check to see if it is already on the grid
      let _alreadyInList = selectedStocks.find(x=>x.symbol.toLowerCase() === symbolInput.toLowerCase());
      if(_alreadyInList) {
        setErrorMessage({show:true,message:"symbol was already in the list."});
        return;
      }else{
        //add it to the array
          setselectedStocks(selectedStocks=>selectedStocks.concat(_result));
      }
    }
    else{
      setErrorMessage({show:true,message:"symbol was not valid."});
    }
  }

  /**
   * removes a stock from the list
   * @param {object} stock 
   */
  const removeFromList=(stock)=>{
    setselectedStocks(selectedStocks => selectedStocks.filter(x=>x.symbol !== stock.symbol));
  }

  const isStockUp =(stock)=>{
    return stock.current > stock.open;
  }

  return (
    <div className="App">      
      <h1>Stock Watcher</h1>
      {errorMessage.show ? <div className="error">{errorMessage.message}</div> : ''}
      <section className='input-container'>
        <input type="text" placeholder="Enter Stock Symbol" onChange={e=>setSymbolInput(e.target.value)}  />
        <Button className='button' onClick={addSymbol}>Add Stack</Button>
      </section>
      <section className='tickers-container'>
        {selectedStocks.map((stock,i)=>{
          return(
            <div key={i} className='ticker'>
              <div className={`tickerSideSlider ${isStockUp(stock) ? "up" : "down"}`}>
                <div className='slider'>{stock.high}</div>
                <input type="range" orientation="vertical" value={stock.current} readOnly />
                <div className='slider'>{stock.low}</div>
              </div>
              <div className='ticker-details'>
                <div></div>
                <div className='names'>
                  <div className="">{stock.name}</div>
                  <div className="">{stock.symbol}</div>
                </div>
                <div className='values'>
                  <div className="">{stock.current}</div>
                  <div className="">
                    <div className={isStockUp(stock)? "up":"down"}>{isStockUp(stock) ? <FaArrowUp/> : <FaArrowDown/>}</div>
                    <div className={isStockUp(stock)? "up":"down"}>{`${(stock.current - stock.open).toFixed(2)}`}</div>
                    <div className={isStockUp(stock)? "up":"down"}>{`${(stock.current / stock.open).toFixed(2)}%`}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
