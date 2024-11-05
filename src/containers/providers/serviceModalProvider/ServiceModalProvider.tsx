import React, { useEffect } from "react";
import { ServiceModalName } from "@/enums";
import { selectServiceModals } from "@/redux/selectors/serviceModalSelector";

const ServiceModalProvider = ({ children }: { children: React.ReactNode }) => {
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
