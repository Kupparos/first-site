import React from "react";
import { usePages } from "../../Hooks/usePages";


export default function Pagination({totalePages, page, changePage}) {

  let pagesArray = usePages(totalePages)

  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <button
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
