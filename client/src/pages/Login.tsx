import React, { useState, useEffect } from "react";
import { login } from "../api/auth.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || email.trim() === "" || !password || password.trim() === "") {
      // Poupar o banco
      setError(true);
      return;
    }

    try {
      const res = await login(email, password);

      if (res.status != 200) {
        setError(true);
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data))

    } catch (error) {
      setError(true);
      console.log(error);
      return;
    }

    navigate("/Profile");
  };

  const handleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="text-zinc-400 mt-2">Entre para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`${error ? "border-red-500" : "border-zinc-700"} w-full px-4 py-3 rounded-xl bg-zinc-800 border text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition`}
            />
          </div>

          <div>
            <input
              type={isChecked ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className={`${error ? "border-red-500" : "border-zinc-700"} w-full px-4 py-3 rounded-xl bg-zinc-800 border text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition`}
            />
          </div>

          <label className="flex size-fit items-center justify-start gap-2 text-sm text-zinc-400 select-none hover:cursor-pointer p-1.5">
            <button
              type="button"
              onClick={handleCheckbox}
              className={`w-11 h-6 rounded-full p-1 transition flex items-center ${isChecked ? "bg-violet-600" : "bg-zinc-700"} hover:cursor-pointer`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${isChecked ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <span>Mostrar senha</span>
          </label>

          {error && (
            <h3 className="text-red-500 text-center">
              Credenciais incorretas.
            </h3>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 hover:scale-105 active:scale-[0.98] transition cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
