"use client";
import { signOutAction } from "@/actions/auth/login";
import { useSession } from "@/hooks/useSession";
import { UserCookie } from "@/interfaces/auth-response";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const UserContent = () => {
  const { session, loading } = useSession();

  return (
    <>
      {loading ? (
        <Spinner size="sm" />
      ) : (
        session && <UserActive user={session} />
      )}
    </>
  );
};
interface Props {
  user: UserCookie;
}

const UserActive = ({ user }: Props) => {
  const t = useTranslations("dropdown");
  const route = useRouter();
  const Onredirect = () => {
    route.push("/profile");
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="default"
          name="Jason Hughes"
          size="sm"
          src={user.phono}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">
            {user.firstname} {user.lastname}{" "}
          </p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" onPress={() => Onredirect()}>
          {t("option1")}
        </DropdownItem>
        <DropdownItem
          key="myreservations"
          onPress={() => route.push("/myreservations")}
        >
          Mis Reservas
        </DropdownItem>
       
        <DropdownItem
          onPress={() => signOutAction()}
          key="logout"
          color="danger"
        >
          {t("option4")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
