import { UserRolesEnum } from "../types/enum/UserEnum";
import type { LinkInterface } from "../types/interfaces/linkInterfaces.types";

const ALL_ROLES: UserRolesEnum[] = Object.values(UserRolesEnum);

export const appLinks: LinkInterface = {
  items: {
    resetPassword: {
      name: "Changer de mot de passe",
      path: "/nouveau-mot-de-passe",
    },
    forgotPassword: {
      name: "Mot de passe oublié",
      path: "/reinitialisation-mot-passe",
    },
  },
};

export const menuLinks: LinkInterface = {
  items: {
    dashboard: {
      name: "Tableau de bord",
      path: "/tableau-de-bord",
      allowedRoles: ALL_ROLES,
    },
    users: {
      name: "Tous les utilisateurs",
      path: "/utilisateurs",
      allowedRoles: ALL_ROLES,
    },
    newAlert: {
      name: "Nouvelle alerte",
      path: "/nouvelle-alerte",
      allowedRoles: ALL_ROLES,
    },
    newUser: {
      name: "Créer un utilisateur",
      path: "/nouvel-utilisateur",
      allowedRoles: [UserRolesEnum.SUPERVISOR],
    },
  },
};
