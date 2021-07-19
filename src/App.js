import "./App.css";
import React, { useState, createContext } from "react";
import useFormInput from "./custom-hook";
import useFetch from "./fetch-hook";

const TestContext = createContext({
  animal: "cat",
});

function App() {
  const { data, loading, error } = useFetch(
    "http://jsonplaceholder.typicode.com/users"
  );
  const [list, setList] = useState("Parent component");
  const firstName = useFormInput("Steve");
  const lastName = useFormInput("Jobs");
  const success = "cat" ? "Congrat!!! You can use context" : "No it's not";

  return (
    <div className="abc">
      <input type="text" {...firstName} />
      <input type="text" {...lastName} />
      <div>
        {loading ? (
          <div>Loading data...</div>
        ) : (
          <div>
            <table>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
              <td>
                {data.map((item) => {
                  return (
                    <div key={item.id}>
                      {item.name}
                      <br />
                    </div>
                  );
                })}
              </td>
              <td>
                {data.map((item) => {
                  return (
                    <div key={item.id}>
                      {item.email}
                      <br />
                    </div>
                  );
                })}
              </td>
            </table>
          </div>
        )}
      </div>
      {console.log("Error : ", error)}
      <div>
        <TestProps name="Phuwarin" list={list} setList={setList} />
        <TestFetch />
      </div>
      <TestContext.Provider value={{ animal: success }}>
        <Animal />
      </TestContext.Provider>
    </div>
  );
}

const Animal = () => {
  return (
    <TestContext.Consumer>
      {(context) => (
        <div>
          <h1>{context.animal}</h1>
        </div>
      )}
    </TestContext.Consumer>
  );
};

const TestProps = (props) => {
  function ChangeWord() {
    return props.setList("Change from Child setState");
  }
  return (
    <div>
      <center>
        <h1>------- Getting Props -------</h1>
        <h1>Hello my name is : {props.name}</h1>
        <h1>Aey Yo : {props.list}</h1>
        <button onClick={() => ChangeWord()}>ChangeWord</button>
      </center>
    </div>
  );
};

const TestFetch = () => {
  const { data, loading, error } = useFetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
  );
  console.log("err :", error);
  return (
    <div>
      {console.log("rerendering")}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <center>
            Loading Finished
            <p>{data.count}</p>
            {data.results.map((item) => {
              return (
                <div>
                  {item.name}
                  <br />
                </div>
              );
            })}
          </center>
        </div>
      )}
    </div>
  );
};

export default App;
