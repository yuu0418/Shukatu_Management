"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldErrors, SubmitHandler } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const json = await res.json();

      if (!json.success) {
        setError(json.message || "ログインに失敗しました");
      } else {
        // ログイン成功時の処理（例: リダイレクト）
      }
    } catch (e) {
      setError("通信エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-8 px-12 mt-16 bg-white shadow-md rounded-[8px]">
        <h1 className="text-2xl font-semibold text-center mb-4">ログイン</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          ようこそ！ログインして始めましょう。
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              placeholder="メールアドレス"
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "メールアドレスの形式が正しくありません",
                },
              })}
              className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              id="password"
              placeholder="パスワード"
              {...register("password", { required: "パスワードは必須です" })}
              className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-cyan-500 hover:bg-cyan-600 px-3 py-2 rounded-[8px] transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={isLoading}
          >
            {isLoading ? "ログイン中..." : "送信"}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            アカウントをお持ちでない方は
          </span>
          <a
            href="/signup"
            className="ml-1 text-sm text-cyan-600 hover:underline font-medium"
          >
            こちら
          </a>
        </div>
      </div>
    </div>
  );
};
