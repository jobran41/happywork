import React, { ReactElement, useEffect } from "react";
import { useKeycloak } from "@react-keycloak/ssr";

import type { KeycloakInstance } from "keycloak-js";
import Cookies from "js-cookie";

import Loader from "components/loader";
import { useRouter } from "next/router";
import { adminRole } from "shared/constants";
import { NEXT_PUBLIC_KEYCLOAK_REALM } from "config";
import AccessDenied from "./AccessDenied";

const Auth = ({
  children,
  forAdmin,
}: {
  children: ReactElement;
  forAdmin: boolean | undefined;
}) => {
  const router = useRouter();
  const { keycloak } = useKeycloak<KeycloakInstance>();
  // console.log("token parsed", keycloak?.tokenParsed);
  // console.log("token : ", keycloak?.token);
  const isAuth = keycloak?.authenticated === true;
  const isAdmin = isAuth && keycloak?.hasRealmRole(adminRole);
  const isMerchant = isAuth && keycloak?.hasRealmRole(adminRole) === false;

  useEffect(() => {
    Cookies.set("jwt", keycloak?.token as string);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keycloak?.authenticated, keycloak?.token]);

  useEffect(() => {
    let queries = null;
    const uid = router.query.uid as string;
    queries = { realm: NEXT_PUBLIC_KEYCLOAK_REALM };
    if (uid) {
      queries = { ...queries, uid };
    }
    if (router.query.realm !== NEXT_PUBLIC_KEYCLOAK_REALM) {
      router.push(
        {
          pathname: router.pathname,
          query: queries,
        },
        undefined,
        { shallow: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  if (isAdmin || (isMerchant && forAdmin !== true)) {
    if (isAdmin) {
      return children;
    }
    return <AccessDenied />;
  }

  return <Loader />;
};
export default Auth;
