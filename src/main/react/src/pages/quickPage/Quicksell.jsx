import Quicksell1 from "../../components/quicksell/Quicksell1";
import Quicksell2 from "../../components/quicksell/Quicksell2";
import Quicksell3 from "../../components/quicksell/Quicksell3";
import { Center } from "../../components/PublicStyle";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { TossPage } from "../../utill/Toss";

const Quicksell = () => {
  const { feedId, title } = useParams();
  const [feedName, setFeedName] = useState();
  const [price, setPrice] = useState();

  const onSelect = (sel) => {
    setFeedName(sel);
  };
  const onPrice = (sel) => {
    setPrice(sel);
  };

  return (
    <>
      <Center>
        <Quicksell1 feedId={feedId} onSelect={onSelect} />
        <Quicksell2 />
        <Quicksell3 feedName={feedName} title={title} onPrice={onPrice}/>
      </Center>
      <div style={{ width: "100%", margin: "0 auto" }}>
        <TossPage payPrice={price} />
      </div>
    </>
  );
};

export default Quicksell;
