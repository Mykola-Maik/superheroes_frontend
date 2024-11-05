import { ServiceModalName } from "@/enums";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/redux/store";

export const selectServiceModals = () =>
  useAppSelector((state: RootState) => state.serviceModalSlice);

export const selectServiceModalPayload = (modalName: ServiceModalName) => {
  return useAppSelector(
    (state: RootState) => state.serviceModalSlice[modalName]
  );
};
