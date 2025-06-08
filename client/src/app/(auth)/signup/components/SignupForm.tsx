"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/register`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });
      const json = await res.json();

      if (!res.ok || json.error) {
        setError(json.error || json.message || "登録に失敗しました");
      } else {
        // 登録成功時の処理
        router.push("/");
      }
    } catch (e) {
      setError("通信エラーが発生しました");
      console.error("Error during registration:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md p-8 px-12 mt-16 bg-white shadow-md rounded-[8px]">
        <h1 className="text-2xl font-semibold text-center mb-4">新規登録</h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          アカウントを作成しましょう！
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              id="username"
              placeholder="名前"
              {...register("username", {
                required: "名前は必須です",
                maxLength: {
                  value: 10,
                  message: "名前は10文字以内で入力してください",
                },
              })}
              className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              disabled={isLoading}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

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
              {...register("password", {
                required: "パスワードは必須です",
                minLength: {
                  value: 6,
                  message: "パスワードは6文字以上で入力してください",
                },
              })}
              className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              id="confirmPassword"
              placeholder="パスワード（確認）"
              {...register("confirmPassword", {
                required: "パスワードの確認は必須です",
                validate: (value) =>
                  value === watch("password") || "パスワードが一致しません",
              })}
              className="w-full border border-gray-300 rounded-[8px] px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-cyan-500 hover:bg-cyan-600 px-3 py-2 rounded-[8px] transition-colors disabled:opacity-50 disabled:pointer-events-none"
            disabled={isLoading}
          >
            {isLoading ? "登録中..." : "送信"}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            すでにアカウントをお持ちの方は
          </span>
          <a
            href="/login"
            className="ml-1 text-sm text-cyan-600 hover:underline font-medium"
          >
            こちら
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
