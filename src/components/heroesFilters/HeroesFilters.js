import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters } from "./filtersSlice";
import { activeFilterChanged, f } from "./filtersSlice";

import classNames from "classnames";

import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const dispatch = useDispatch();
  const { filters, activeFilter, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );
  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }
  const renderFilters = (filter) => {
    if (filter.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }

    return filters.map(({ name, label, className }) => {
      const btnClass = classNames("btn", className, {
        active: name === activeFilter,
      });

      return (
        <button
          id={name}
          key={name}
          label={name}
          className={btnClass}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group w-100 mx-auto">{elements}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
