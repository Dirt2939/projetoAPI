import { Pencil } from "lucide-react";
import CardsProfile from "../components/CardsProfile";
import type UserProfileData from "../types/User";

const userWithoutDates: Omit<UserProfileData, "createdAt" | "updatedAt"> = {
  name: "Ana Silva",
  email: "ana.silva@example.com",
  phone: "(11) 99999-9999",
  ocuppacion: "CUSTOMER",
  status: true,
};

function Profile() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 text-white">
      <header className="p-7 flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl">Meu Perfil</h1>
          <h3 className="text-zinc-400">Visualize suas informações pessoas</h3>
        </div>
        <div className="text-violet-500 border-[1.5px] border-violet-500 bg-transparent rounded-md flex justify-center gap-2 p-2 items-center size-fit text-md">
          <Pencil size={19}/>
          <h1 className="">Editar Pefil</h1>
        </div>
      </header>

      <div className="bg-[#12122a] p-5 rounded-md">
        <h2 className="mb-4 font-bold">Informações Pessoais</h2>
        <CardsProfile user={userWithoutDates} />
      </div>

    </div>
  );
}

export default Profile;
