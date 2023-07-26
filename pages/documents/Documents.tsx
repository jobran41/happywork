import React from "react";
import { useIntl } from "react-intl";
import Title from "components/title";

// import styles from "./Documents.module.scss";

function Documents() {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  return (
    <>
      <Title>{f("Documents page is currently under construction ...")}</Title>
    </>
  );
}

export default Documents;
