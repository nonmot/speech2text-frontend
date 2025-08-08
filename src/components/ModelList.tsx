import React, { useState, useEffect } from "react";
import { getModelList } from "../api/api";

interface Model {
  name: string;
  language: string;
}

const ModelList: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const data = async () => {
      const data = await getModelList();
      setModels(data);
    }
    data();
  }, []);
  
  return (
    <div>
        {models && models.length > 0 ? (
          <select>
            {models.map((model, index) => (
              <option key={index} value={model.name}>{model.name}, {model.language}</option>
            ))}
          </select>
        ): (
          <p>Sorry, Something went wrong.</p>
        )}
    </div>
  );
}

export default ModelList;
