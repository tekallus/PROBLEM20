import React, { useEffect, useState } from "react";

// todos endpoint'inden tüm todo'ları getirin ve todo bileşeninde görüntüleyin
// API endpoint: https://jsonplaceholder.typicode.com/users/1/todos
export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Todos endpoint'inden veri çekme
    fetch("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("veri cekme hatasi", error));
  }, []);
  //Boş bağımlılık dizisi ([]) ile, bu etki yalnızca bileşen ilk kez render edildiğinde çalışır.

  //handleToggle fonksiyonu, bir todo'nun tamamlandı durumunu tersine çevirmek için kullanılır.
  //Fonksiyon, id parametresini alır ve setTodos fonksiyonu ile mevcut todos state'ini günceller.
  //map fonksiyonu kullanarak, değiştirilmek istenen todo'nun id'sine sahip olanı bulur ve tamamlanma durumunu tersine çevirir (!todo.completed).
  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="flex justify-center flex-col items-center py-8">
      <h1 className="text-2xl font-bold pb-4">Yapılacaklar Listem</h1>
      <div className="space-y-5">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggle={handleToggle} //Bu prop, handleToggle fonksiyonunu çağırmak için kullanılır. Bu sayede, todo üzerine tıklanıldığında durum değişikliği gerçekleştirilir.
          />
        ))}
      </div>
    </div>
  );
}

function Todo({ id, title, completed, onToggle }) {
  return (
    <div className="relative flex items-start cursor-pointer">
      <div className="flex h-6 items-center">
        <input
          id={`completed-${id}`}
          name={`completed-${id}`}
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)} //onClick özelliği, todo üzerine tıklanıldığında onToggle fonksiyonunu çağırır.
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="ml-3 text-sm leading-6" onClick={() => onToggle(id)}>
        <div
          className={`font-medium text-gray-900 ${
            completed ? "line-through" : ""
          }`}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
