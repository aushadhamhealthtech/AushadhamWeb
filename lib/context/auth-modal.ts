export type AuthModalView = "signin" | "signup" | "doctor-onboarding" | "forgot-password" | null;

type AuthModalState = {
  view: AuthModalView;
  openModal: (_view: Exclude<AuthModalView, null>) => void;
  closeModal: () => void;
};

export function useAuthModal(): AuthModalState {
  return {
    view: null,
    openModal: () => {
      return;
    },
    closeModal: () => {
      return;
    },
  };
}
