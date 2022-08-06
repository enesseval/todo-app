import { useEffect, useState, React } from "react";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [marked, setMarked] = useState(0);

  const allItems = () => {
    setFilteredList(
      todoList.filter((item) => {
        setMarked(0);
        return item.status === true || item.status === false;
      })
    );
  };

  const allActiveItems = () => {
    setFilteredList(
      todoList.filter((item) => {
        setMarked(1);
        return item.status === false;
      })
    );
  };

  const allComplatedItems = () => {
    setFilteredList(
      todoList.filter((item) => {
        setMarked(2);
        return item.status === true;
      })
    );
  };

  const keyPress = (input) => {
    setTodoList([...todoList, { todo: input, status: false }]);
    allItems();
  };

  useEffect(() => {
    allItems();
  }, [todoList]);

  useEffect(() => {
    const comp = (e) => {
      todoList.find((item) => {
        if (item.status) {
          document.getElementById("but").classList.add("b");
        } else {
          document.getElementById("but").classList.remove("b");
        }
      });
    };
    comp();
    allItems();
  }, []);

  const itemCheck = (e) => {
    var item = e.target.parentElement.id;
    todoList[item].status
      ? (todoList[item].status = false)
      : (todoList[item].status = true);

    allItems();
  };

  const allItemsCheck = (e) => {
    var x = todoList.some((item) => {
      return item.status === false;
    });

    x
      ? todoList.forEach((item) => {
          item.status = true;
        })
      : todoList.forEach((item) => {
          item.status = false;
        });
    allItems();
  };

  const deleteItem = (e) => {
    setTodoList(
      todoList.filter(
        (item) => item.todo !== e.target.previousSibling.innerHTML
      )
    );
  };

  const clearActivated = () => {
    setTodoList(todoList.filter((item) => item.status === false));
  };

  return (
    <div id="container">
      <section id="content">
        <article id="input">
          <input type="checkbox" onChange={allItemsCheck} />
          <input
            placeholder="What Needs to be done ?"
            className="todoText"
            onKeyDown={(e) => {
              if (e.code === "Enter" && e.target.value !== "") {
                keyPress(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </article>
        <article>
          <ul className="list">
            {filteredList.map((item, index) => (
              <div id={index} key={index} className="listItemDiv">
                <input
                  className="todoListCheckBox toggle"
                  type="checkbox"
                  checked={item.status}
                  onChange={itemCheck}
                />
                <li className={`todoListItem ${item.status ? "overLine" : ""}`}>
                  {item.todo}
                </li>
                <button className="deleteButton" onClick={deleteItem}>
                  X
                </button>
              </div>
            ))}
          </ul>
        </article>
        <article id="footer">
          <div className="ic">
            <button className="btn">{todoList.length} items left</button>
          </div>
          <div>
            <button
              id="allItems"
              className={`btn ${marked === 0 ? "marked" : ""}`}
              onClick={allItems}
            >
              All
            </button>
            <button
              className={`btn ${marked === 1 ? "marked" : ""}`}
              onClick={allActiveItems}
            >
              Active
            </button>
            <button
              className={`btn ${marked === 2 ? "marked" : ""}`}
              onClick={allComplatedItems}
            >
              Complated
            </button>
          </div>
          <div>
            <button
              id="but"
              onClick={clearActivated}
              className={`btn a ${
                todoList.some((i) => i.status) ? "show" : "hidden"
              }`}
            >
              Clear activated
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Todo;
