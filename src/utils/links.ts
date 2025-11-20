import type { LinkInterface } from "../types/interfaces/linkInterfaces.types";

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
    },
    users: {
      name: "Tous les utilisateurs",
      path: "/utilisateurs",
    },
    newAlert: {
      name: "Nouvelle alerte",
      path: "/nouvelle-alerte",
    },
    newUser: {
      name: "Nouvel utilisateur",
      path: "/nouvel-utilisateur",
    },
  },
};
