import { Pencil, UserRound } from "lucide-react";
import CardsProfile from "../components/CardsProfile";

function Profile() {
  const data = localStorage.getItem("user") ?? "";
  const user = JSON.parse(data);

  const { createdAt, updatedAt, uuid, ...userWithoutDates } = user;
  const userDates = { createdAt, updatedAt };
  
  void uuid; // Só pra tirar o aviso

  const formateData = (data: string) => {
    const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(data));

    return dataFormatada;
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 text-zinc-100">
      <header className="flex justify-between p-7">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>

          <p className="text-zinc-500">Visualize suas informações pessoais</p>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-amber-500 px-4 py-2 text-amber-400 transition-all hover:bg-amber-500/10 hover:shadow-lg hover:shadow-amber-500/10">
          <Pencil size={18} />
          Editar Perfil
        </button>
      </header>

      {/* Perfil */}
      <div className="mb-5 p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
        <UserRound
          size={80}
          className="bg-[#363b4d] rounded-full border-e-amber-950 size-30"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl">{userWithoutDates.name}</h1>
          <h2 className="text-gray-400">
            Na plataforma desde {formateData(userDates.createdAt)}
          </h2>
          <div className="flex gap-2 items-center">
            <div
              className={`w-4 h-4 rounded-full ${userWithoutDates.isActive ? "bg-green-400" : "bg-red-500"}`}
            />
            <p
              className={
                userWithoutDates.isActive ? "text-green-400" : "text-red-500"
              }
            >
              Conta {userWithoutDates.isActive ? "ativa" : "desativada"}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-5 text-lg font-semibold text-amber-400">
          Informações Pessoais
        </h2>

        <CardsProfile user={userWithoutDates} />
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="mb-5 text-lg font-semibold text-amber-400">
          Informações da Conta
        </h2>

        <CardsProfile user={userDates} />
      </div>
    </div>
  );
}

export default Profile;
