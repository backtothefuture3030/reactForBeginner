import { useEffect, useState } from "react";


function App(){
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([])

    const [price, setPrice] = useState(1);
    const [need, setNeed] = useState(1);
    const onChange = (event) =>{
        setPrice(event.target.value);
        setNeed(1);
    }
    const handleInput = (event) =>{
        setNeed(event.target.value);
    }


    useEffect(()=>{
        fetch("https://api.coinpaprika.com/v1/tickers?limit=4000")
        .then((response => response.json()))
        .then(json =>{
            setCoins(json);
            setLoading(false);

        });
    }, [])
    return (
    <div>

        <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
        {loading ? 
            (<strong>Loading...</strong>) : (        
            <select onChange={onChange}>
                <option>Select Coin!</option>
                {coins.map((coin, index) => 
                <option
                    key={index}
                    value = {coin.quotes.USD.price}
                    id = {coin.symbol}
                    symbol = {coin.symbol} >
                    {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
                </option>
                )}
            </select>)}
            <h2>Enter your dollars</h2>
            <div>
                <input type="number" value={need} onChange={handleInput} placeholder="dollar"/>$
            </div>
            <h2>Your coin is {need/price} volume</h2>
    </div>
    ); 
}

export default App;