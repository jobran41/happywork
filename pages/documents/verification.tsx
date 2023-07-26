import React from "react";
import { useIntl } from "react-intl";
import Title from "components/title";

// import styles from "./Documents.module.scss";

function Pages() {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  return (
    <>
      <Title>
        {f("Pages verification page is currently under construction ...")}
      </Title>
    </>
  );
}

export default Pages;
