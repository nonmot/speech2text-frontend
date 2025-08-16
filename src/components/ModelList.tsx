import React, { useState, useEffect } from "react";
import { getModelList } from "../api/api";
import type { Model } from "../types/types";
import Loading from "./Loading";

type Props = {
  model: Model | null;
  setModel: React.Dispatch<React.SetStateAction<Model | null>>;
};

const ModelList: React.FC<Props> = (props) => {
  const { model, setModel } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const list = await getModelList();
        setModels(list);
      } catch (error: any) {
        setError(error?.message ?? "failed to load");
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
  }, []);

  const onChangeSelectModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModelName = e.target.value;
    const next = models.find((m) => m.name === selectedModelName) ?? null;
    setModel(next);
  };

  if (isLoading)
    return (
      <div className="mx-auto py-5">
        <label
          htmlFor="models"
          className="block mb-2 text-md font-medium text-gray-900"
        >
          モデルの選択<span className="text-red-700"> *</span>
        </label>
        <Loading size={30} />
      </div>
    );
  if (error || models.length === 0) return <p>Sorry, Something went wrong.</p>;

  return (
    <form className="py-5">
      <label
        htmlFor="models"
        className="block mb-2 text-md font-medium text-gray-900"
      >
        モデルの選択<span className="text-red-700"> *</span>
      </label>
      <select
        id="models"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block p-2.5"
        value={model?.name ?? ""}
        onChange={onChangeSelectModel}
      >
        <option value="" disabled hidden>
          モデルを選択してください。
        </option>
        {models.map((model) => (
          <option key={model.name} value={model.name}>
            {model.name}, {model.language}
          </option>
        ))}
      </select>
    </form>
  );
};

export default ModelList;
