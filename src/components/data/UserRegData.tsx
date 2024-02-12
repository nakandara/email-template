import { useCardContext } from "../context/CardContext";



interface ColumnNames {
  key: string;
  value: string;
}



const UserRegData = () => {
  const {
  
    outPayLoad
  } = useCardContext();




  const jsonData = JSON.stringify(outPayLoad, null, 2);

  return (
    <div>
      <pre>
        <code>{jsonData}</code>
      </pre>
    </div>
  );
};

export default UserRegData;
