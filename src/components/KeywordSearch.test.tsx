import { screen, render, within, fireEvent } from "@testing-library/react";
import KeywordSearch from "./KeywordSearch";
import userEvent from "@testing-library/user-event";

describe("KeywordSearch", () => {
  test("キーワードが空なら「検索条件なしが表示される」", () => {
    const keywords: string[] = []
    const setKeywords = jest.fn();
    const onClickDeleteKeyword = jest.fn();
    render(<KeywordSearch
      keywords={keywords}
      setKeywords={setKeywords}
      onClickDeleteKeyword={onClickDeleteKeyword}
    />);
     
    const input = screen.getByLabelText('キーワード');
    expect(input).toBeInTheDocument();
    expect(screen.getByText("検索条件なし")).toBeInTheDocument();
  });

  test("入力後に『追加』クリックで setKeywords([input]) が1回呼ばれ、入力は空になる", () => {
    const setKeywords = jest.fn();
    const onClickDeleteKeyword = jest.fn();
    render(
      <KeywordSearch
        keywords={[]}
        setKeywords={setKeywords}
        onClickDeleteKeyword={onClickDeleteKeyword}
      />
    );

    const input = screen.getByLabelText("キーワード") as HTMLInputElement;
    const addBtn = screen.getByRole("button", { name: "追加" });

    userEvent.type(input, "apple");
    userEvent.click(addBtn);

    expect(setKeywords).toHaveBeenCalledTimes(1);
    const arg = setKeywords.mock.calls[0][0] as string[];
    expect(arg).toEqual(["apple"]);
    expect(input.value).toBe(""); // クリアされる
  });

  test("空入力で『追加』を押しても setKeywords は呼ばれない", () => {
    const setKeywords = jest.fn();
    const onClickDeleteKeyword = jest.fn();
    render(
      <KeywordSearch
        keywords={[]}
        setKeywords={setKeywords}
        onClickDeleteKeyword={onClickDeleteKeyword}
      />
    );

    const addBtn = screen.getByRole("button", { name: "追加" });
    userEvent.click(addBtn);
    expect(setKeywords).not.toHaveBeenCalled();
  });

  test("Enter キーで追加される（isComposing=false）", () => {
    const setKeywords = jest.fn();
    const onClickDeleteKeyword = jest.fn();
    render(
      <KeywordSearch
        keywords={[]}
        setKeywords={setKeywords}
        onClickDeleteKeyword={onClickDeleteKeyword}
      />
    );

    const input = screen.getByLabelText("キーワード") as HTMLInputElement;
    userEvent.type(input, "orange");

    // userEvent.keyboard('{enter}') でもよいが、key と composing の制御を明示
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(setKeywords).toHaveBeenCalledTimes(1);
    const arg = setKeywords.mock.calls[0][0] as string[];
    expect(arg).toEqual(["orange"]);
    expect(input.value).toBe("");
  });

  test("IME 変換中 (isComposing=true) の Enter は無視される", () => {
    const setKeywords = jest.fn();
    const onClickDeleteKeyword = jest.fn();
    render(
      <KeywordSearch
        keywords={[]}
        setKeywords={setKeywords}
        onClickDeleteKeyword={onClickDeleteKeyword}
      />
    );

    const input = screen.getByLabelText("キーワード") as HTMLInputElement;
    userEvent.type(input, "か");

    // nativeEvent.isComposing を true にして Enter
    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      isComposing: true,
    });

    expect(setKeywords).not.toHaveBeenCalled();
    // 入力はそのまま
    expect(input.value).toBe("か");
  });

  test("既存キーワードが表示され、削除ボタンで onClickDeleteKeyword(index) が呼ばれる", () => {
    const keywords = ["foo", "bar", "baz"];
    const setKeywords = jest.fn();
    const onClickDeleteKeyword = jest.fn();
    render(
      <KeywordSearch
        keywords={keywords}
        setKeywords={setKeywords}
        onClickDeleteKeyword={onClickDeleteKeyword}
      />
    );

    // 3件表示される
    keywords.forEach((k) => expect(screen.getByText(k)).toBeInTheDocument());

    // 「bar」のチップ内の削除ボタンを押す
    const barChip = screen.getAllByTestId("chip").find(
      el => el.textContent?.includes("bar")
    ) as HTMLElement;
    const delBtn = within(barChip).getByRole("button"); // SVGのみなので名前なし
    userEvent.click(delBtn);

    expect(onClickDeleteKeyword).toHaveBeenCalledTimes(1);
    expect(onClickDeleteKeyword).toHaveBeenCalledWith(1); // bar の index
  });

  test("既存 keywords がある状態でさらに追加すると末尾に追加される", () => {
    const setKeywords = jest.fn();
    const onClickDeleteKeyword = jest.fn();
    render(
      <KeywordSearch
        keywords={["alpha"]}
        setKeywords={setKeywords}
        onClickDeleteKeyword={onClickDeleteKeyword}
      />
    );

    const input = screen.getByLabelText("キーワード") as HTMLInputElement;
    const addBtn = screen.getByRole("button", { name: "追加" });

    userEvent.type(input, "beta");
    userEvent.click(addBtn);

    expect(setKeywords).toHaveBeenCalledTimes(1);
    const arg = setKeywords.mock.calls[0][0] as string[];
    expect(arg).toEqual(["alpha", "beta"]);
  });
})
