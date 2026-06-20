import {
  Mail,
  User,
  Phone,
  Shield,
  CircleCheck,
  CalendarDays,
  CalendarClock,
} from "lucide-react";
import type { ReactNode } from "react";
import type UserProfileData from "../types/User";

const titlesKeys: Record<keyof UserProfileData, string> = {
  name: "Nome completo",
  email: "Email",
  phone: "Telefone",
  ocuppacion: "Função",
  status: "Status",
  createdAt: "Criado em",
  updatedAt: "Atulizado em",
};

const iconSize = 20;

const iconKeys: Record<keyof UserProfileData, ReactNode> = {
  name: <User size={iconSize} />,
  email: <Mail size={iconSize} />,
  phone: <Phone size={iconSize} />,
  ocuppacion: <Shield size={iconSize} />,
  status: <CircleCheck size={iconSize} />,
  createdAt: <CalendarDays size={iconSize} />,
  updatedAt: <CalendarClock size={iconSize} />,
};

type UserProfileDataWithoutDates = Omit<
  UserProfileData,
  "createdAt" | "updatedAt"
>;
type UserProfileDataOnlyDates = Pick<
  UserProfileData,
  "createdAt" | "updatedAt"
>;
type UserProfileDataEitherDates =
  | UserProfileDataWithoutDates
  | UserProfileDataOnlyDates;

interface UserInfoProps {
  user: UserProfileDataEitherDates;
}

function CardsProfile({ user }: UserInfoProps) {
  return (
    <div className="">
      {Object.entries(user).map(([key, value]) => {
        const chave = key as keyof UserProfileData;

        return (
          <>
            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-700 to-transparent" />
            <div
              key={chave}
              className="flex gap-4 pb-4 pt-4 items-center py-2 border-b border-white/5 last:border-0 size-fit"
            >
              <div className="bg-[#363b4d] items-center p-2 size-fit rounded-full">
                {iconKeys[chave]}
              </div>
              <div className="">
                <h2 className="text-xs text-white">{titlesKeys[chave]}</h2>
                <h3 className="text-gray-400">
                  {chave === "status" ? (value ? "Ativo" : "Inativo") : value}
                </h3>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default CardsProfile;
