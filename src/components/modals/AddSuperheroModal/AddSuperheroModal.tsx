import BaseModal from "@/components/modals/BaseModal/BaseModal";
import { useAppDispatch } from "@/hooks";
import { removeServiceModal } from "@/redux/slices/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { selectServiceModalPayload } from "@/redux/selectors/serviceModalSelector";
import { useEffect } from "react";
import { getSuperheroRequest } from "@/redux/slices/currentSuperheroSlice/currentSuperheroSlice";
import { AddSuperheroForm } from "./components";

function AddSuperheroModal() {
  const dispatch = useAppDispatch();

  const payload = selectServiceModalPayload(ServiceModalName.EditSuperhero);
  const { superheroId } = payload || {};

  useEffect(() => {
    if (superheroId) {
      dispatch(getSuperheroRequest(superheroId));
    }
  }, [superheroId, dispatch]);

  const handleOnClose = () => {
    dispatch(
      removeServiceModal(
        superheroId
          ? ServiceModalName.EditSuperhero
          : ServiceModalName.AddSuperhero
      )
    );
  };

  return (
    <BaseModal
      title={superheroId ? "Edit Superhero" : "Add Superhero"}
      onClose={handleOnClose}
      index={1000}
      width="752px"
    >
      <AddSuperheroForm superheroId={superheroId} />
    </BaseModal>
  );
}

export default AddSuperheroModal;
