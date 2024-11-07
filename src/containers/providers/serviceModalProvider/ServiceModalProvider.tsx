import React, { Suspense, useEffect } from "react";
import { ServiceModalName } from "@/enums";
import { selectServiceModals } from "@/redux/selectors/serviceModalSelector";
import { Loader } from "@/components";

const AddSuperhero = React.lazy(
  () => import("@/components/modals/AddSuperheroModal/AddSuperheroModal")
);

const EditSuperhero = React.lazy(
  () => import("@/components/modals/AddSuperheroModal/AddSuperheroModal")
);

const DeleteSuperhero = React.lazy(
  () => import("@/components/modals/DeleteSuperheroModal/DeleteSuperheroModal")
);

const ServiceModalProvider = ({ children }: { children?: React.ReactNode }) => {
  const modalKeys = Object.keys(selectServiceModals());

  useEffect(() => {
    const modalOverflow = document.body.style.overflow;

    document.body.style.overflow = modalKeys?.length ? "hidden" : modalOverflow;

    return () => {
      document.body.style.overflow = modalOverflow;
    };
  }, [modalKeys]);

  const getModalComponent = (key: ServiceModalName) => {
    switch (key) {
      case ServiceModalName.AddSuperhero:
        return (
          <Suspense fallback={<Loader />}>
            <AddSuperhero />
          </Suspense>
        );

      case ServiceModalName.EditSuperhero:
        return (
          <Suspense fallback={<Loader />}>
            <EditSuperhero />
          </Suspense>
        );

      case ServiceModalName.DeleteSuperhero:
        return (
          <Suspense fallback={<Loader />}>
            <DeleteSuperhero />
          </Suspense>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {children}
      {modalKeys.map((key: any) => (
        <React.Fragment key={key}>{getModalComponent(key)}</React.Fragment>
      ))}
    </>
  );
};

export default ServiceModalProvider;
