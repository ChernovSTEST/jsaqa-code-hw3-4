const sorting = require("../../app");

describe("Books names test suite", () => {
  it("should sort books names in ascending order when nameA < nameB", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  it("should sort books names in ascending order when nameA > nameB", () => {
    expect(
      sorting.sortByName([
        "B",
        "C",
        "A",
      ])
    ).toEqual([
      "A",
      "B",
      "C",
    ]);
  });

  it("should handle empty input array", () => {
    expect(sorting.sortByName([])).toEqual([]);
  });

  it("should handle names with same case-insensitive values", () => {
    expect(
      sorting.sortByName([
        "apple",
        "Banana",
        "Cherry",
      ])
    ).toEqual([
      "apple",
      "Banana",
      "Cherry",
    ]);
  });

  it("should handle names with special characters", () => {
    expect(
      sorting.sortByName([
        "oranges",
        "Apples",
        "bananas!",
      ])
    ).toEqual([
      "Apples",
      "bananas!",
      "oranges",
    ]);
  });

  it("should handle names with Unicode characters", () => {
    expect(
      sorting.sortByName([
        "Подарок",
        "Волшебство",
        "Яблоко",
      ])
    ).toEqual([
      "Волшебство",
      "Подарок",
      "Яблоко",
    ]);
  });

  it("should handle equal names", () => {
    expect(
      sorting.sortByName([
        "A",
        "A",
        "A",
      ])
    ).toEqual([
      "A",
      "A",
      "A",
    ]);
  });
});
