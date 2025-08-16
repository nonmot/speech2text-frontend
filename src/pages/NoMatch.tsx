import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - ページが見つかりません</h1>
      <p className="text-lg mb-6">
        指定されたURLに対応するページは存在しません。
      </p>
      <Link to="/" className="text-blue-600 hover:underline text-base">
        ホームに戻る
      </Link>
    </div>
  );
};

export default NoMatch;
