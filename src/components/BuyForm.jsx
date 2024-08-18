import { useState } from "react";
import Num2persian from "num2persian";
const goldPrice = Math.floor(Math.random() * 36000000) + 33000000;
function BuyForm() {
  const [chosenTab, setChosenTab] = useState("priceBased");
  const [priceBasedValue, setPriceBasedValue] = useState(0);
  const [insertedGoldWeight, setInsertedGoldWeight] = useState(0);

  const handlePriceBasedChange = (e) => {
    const valueAsNumber = parseInt(e.target.value, 10);
    if (!isNaN(valueAsNumber) && valueAsNumber <= 1000000000) {
      setPriceBasedValue(valueAsNumber);
    }
  };

  const handleGoldWeightChange = (e) => {
    const valueAsNumber = parseFloat(e.target.value); // Convert to number
    if (!isNaN(valueAsNumber)) {
      const formattedValue = valueAsNumber.toFixed(3);
      setInsertedGoldWeight(formattedValue);
    }
  };
  return (
    <div className="buy-form">
      <p>
        <span>قیمت طلا(گرم/ریال)</span>
        <span>{goldPrice.toLocaleString()}</span>
      </p>
      <div className="buying-tab-container">
        <div className="buying-tab" onClick={() => setChosenTab("priceBased")}>
          خرید بر اساس بودجه
        </div>
        <div className="buying-tab" onClick={() => setChosenTab("weightBased")}>
          خرید بر اساس وزن طلا
        </div>
      </div>
      <div className="price-based-tab">
        {chosenTab === "priceBased" ? (
          <div>
            <input
              type="number"
              min="0"
              max="1000000000"
              value={priceBasedValue}
              onChange={handlePriceBasedChange}
            />
            :{" "}
            <span>
              {(priceBasedValue / goldPrice).toFixed(3)} گرم طلایی که میتونی
              بخری انقدره{" "}
            </span>
            <div>
              {Num2persian(priceBasedValue / 10)} <span>تومان</span>
            </div>
          </div>
        ) : (
          <>
            <input
              type="number"
              min="0"
              step="0.1"
              value={insertedGoldWeight}
              onChange={handleGoldWeightChange}
            />
            <p>
              {" "}
              {(insertedGoldWeight * goldPrice).toFixed(3)} قیمت طلایی که میتونی
              بخری به ریال انقدره{" "}
            </p>
          </>
        )}
        <button
          onClick={() => {
              let finalPrice
               if (chosenTab === "priceBased") {
               finalPrice=priceBasedValue

               }
               else{
                finalPrice=insertedGoldWeight * goldPrice

               }
              let budget = +localStorage.getItem("budget");
              if (finalPrice > budget) {
                alert("متاسفانه موجودیتون کمتراز مبلغ انتخابیه");
              } else {
                alert("خریدتون با موفقیت انجام شد");
                let result = +budget - finalPrice;
                localStorage.setItem("budget", result.toString());

                let previousGold = Number(localStorage.getItem("myGold"));
                let boughtGold = finalPrice / goldPrice;
                let gold = previousGold + boughtGold;
                localStorage.setItem("myGold", gold);

                let date = new Date().toLocaleDateString("en-US");
                const savedData = {
                  date: date,
                  price: finalPrice,
                  goldPrice: goldPrice,
                  goldWeight: finalPrice / goldPrice,
                };

                const tableInfo = JSON.parse(localStorage.getItem("tableInfo"));
                tableInfo.push(savedData);
                localStorage.setItem("tableInfo", JSON.stringify(tableInfo));
              }
            }

          }
        >
          خرید
        </button>
      </div>
    </div>
  );
}
export default BuyForm;
