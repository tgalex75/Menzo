export const listaTattiche = [
  { nome: "Scegli lo schema", formazione: [] },
  { nome: "4-4-2", formazione: [1, 5, 9, 11] },
  { nome: "4-2-1-3", formazione: [1, 5, 7, 8, 11] },
  { nome: "4-2-3-1", formazione: [1, 5, 7, 10, 11] },
  { nome: "4-3-1-2", formazione: [1, 5, 8, 9, 11] },
  { nome: "4-3-2-1", formazione: [1, 5, 8, 10, 11] },
  { nome: "4-3-3", formazione: [1, 5, 8, 11] },
  { nome: "3-5-2", formazione: [1, 4, 9, 11] },
  { nome: "3-4-1-2", formazione: [1, 4, 8, 9, 11] },
  { nome: "3-4-2-1", formazione: [1, 4, 8, 10, 11] },
  { nome: "3-4-3", formazione: [1, 4, 8, 11] },
  { nome: "5-3-2", formazione: [1, 6, 9, 11] },
  { nome: "5-2-1-2", formazione: [1, 6, 8, 9, 11] },
];

export const tattiche = listaTattiche.map((el) => el.nome);

export const mySelect = (labelText, ref, func, arr) => {
  return (
    <div className="flex gap-1 flex-col">
      <label
        htmlFor="tattica"
        className="block text-xs font-medium text-gray-300"
      >
        {labelText}
      </label>
      <select
        className="focus:ring-primary-500 text-sm focus:border-primary-500 block w-48 rounded-md border border-gray-300 bg-black/50 px-3 py-2 font-semibold text-gray-200 shadow-sm focus:outline-none"
        name="tattica"
        ref={ref}
        onChange={func}
      >
        {arr.map((el, i) => {
          return (
            <option key={i} value={el}>
              {el}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

let arrDataPlayers = arrayRange(1, 11, 1);

export const data = arrDataPlayers.map((el) => {
  return { id: el, nome: el };
});
