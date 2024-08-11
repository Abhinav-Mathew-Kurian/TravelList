import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleNewItems(item) {
    setItems([...items, item]);
  }

  function handleDeleteId(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    console.log(id);
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleDelete() {
    if (items.length === 0) return alert("No items to delete");
    const confirmed = window.confirm(
      "Are you sure that you want to delete all the items from the list?. By Clicking delte you cannot retrive your data at any cost."
    );

    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form addNewItems={handleNewItems} />
      <Packingist
        items={items}
        onDeleteId={handleDeleteId}
        onToggleItem={handleToggleItem}
        onDelteList={handleDelete}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴FAR AWAY 👜</h1>;
}
function Form({ addNewItems }) {
  const [description, setDescription] = useState("");
  const [numbers, setnumbers] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      return alert("Item box must not be empty");
    }
    setDescription("");
    setnumbers(1);
    const newItem = { description, numbers, packed: false, id: Date.now() };
    console.log(newItem);
    addNewItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={numbers}
        onChange={(e) => setnumbers(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>ADD</button>
    </form>
  );
}

function Packingist({ items, onDeleteId, onToggleItem, onDelteList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedValue;
  if (sortBy === "input") {
    sortedValue = items;
  }
  if (sortBy === "description") {
    sortedValue = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedValue = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedValue.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteId={onDeleteId}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDelteList}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteId, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.numbers + " "}
        {item.description}
      </span>
      <button onClick={() => onDeleteId(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numitems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numitems) * 100);
  if (items.length === 0) {
    return (
      <div className="stats">
        <em>Start adding items to your packing list ❤️‍🔥</em>
      </div>
    );
  } else {
    return (
      <footer className="stats">
        {percentage === 100 ? (
          <em>You have every items on the list, Ready to go✈️</em>
        ) : (
          <em>
            💼You have packed {numitems} elements of {packedItems}({percentage}
            %)
          </em>
        )}
      </footer>
    );
  }
}
