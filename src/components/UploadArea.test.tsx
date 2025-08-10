import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
// react-drag-drop-files をモック
jest.mock("react-drag-drop-files", () => {
  const React = require("react");
  return {
    FileUploader: ({
      handleChange,
      name,
    }: {
      handleChange: (f: File | File[]) => void;
      name?: string;
    }) => (
      <input
        aria-label="upload"
        type="file"
        name={name ?? "file"}
        multiple
        onChange={(e) => {
          const input = e.currentTarget as HTMLInputElement;
          const files = input.files ? Array.from(input.files) : [];
          if (files.length === 0) return;
          handleChange(files.length === 1 ? files[0] : files);
        }}
      />
    ),
  };
});

import UploadArea from "./UploadArea";

describe("UploadArea", () => {
  test("filesがnullのとき、単一ファイルでsetFiles([file])が呼ばれる", () => {
    const setFiles = jest.fn();
    render(<UploadArea files={null} setFiles={setFiles} />)

    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    const file = new File(["wavdata"], "sample.wav", { type: "audio/wav" });

    userEvent.upload(input, file);

    expect(setFiles).toHaveBeenCalledTimes(1);
    const arg = setFiles.mock.calls[0][0] as File[];
    expect(Array.isArray(arg)).toBe(true);
    expect(arg).toHaveLength(1);
    expect(arg[0].name).toBe("sample.wav");
    expect(arg[0].type).toBe("audio/wav");
  });

  test("既存の files がある場合、末尾に追加される", () => {
    const existing = [new File(["a"], "a.wav", { type: "audio/wav" })];
    const setFiles = jest.fn();
    render(<UploadArea files={existing} setFiles={setFiles} />);

    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    const newFile = new File(["b"], "b.wav", { type: "audio/wav" });

    userEvent.upload(input, newFile);

    expect(setFiles).toHaveBeenCalledTimes(1);
    const arg = setFiles.mock.calls[0][0] as File[];
    expect(arg.map((f) => f.name)).toEqual(["a.wav", "b.wav"]);
  });

  test("複数ファイル同時選択は例外を投げ、setFiles は呼ばれない", () => {
    const setFiles = jest.fn();
    render(<UploadArea files={null} setFiles={setFiles} />);

    const input = screen.getByLabelText(/upload/i) as HTMLInputElement;
    const f1 = new File(["1"], "one.wav", { type: "audio/wav" });
    const f2 = new File(["2"], "two.wav", { type: "audio/wav" });
  });

});
