import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from "uuid";

import { heroCreated } from "../../actions";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  const [heroName, setHeroName] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [selectedElement, setSelectedElement] = useState("");

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>Загрузка элементов</option>;
    } else if (status === "error") {
      return <option>Ошибка загрузки элементов</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        if (name === "all") return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newHero = {
      id: uuidv4(),
      name: heroName,
      description: heroDescription,
      element: selectedElement,
    };
    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
      .then((data) => console.log(data))
      .then(dispatch(heroCreated(newHero)))
      .catch((e) => console.log("Объект ошибки:", e));

    setHeroName("");
    setHeroDescription("");
    setSelectedElement("");
  };

  return (
    <form onSubmit={onSubmitHandler} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          value={heroName}
          onChange={(e) => setHeroName(e.target.value)}
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          value={heroDescription}
          onChange={(e) => setHeroDescription(e.target.value)}
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          value={selectedElement}
          onChange={(e) => setSelectedElement(e.target.value)}
          required
          className="form-select"
          id="element"
          name="element"
        >
          <option>Я владею элементом...</option>
          {renderFilters(filters, filtersLoadingStatus)}
          {/*<option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option> */}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
