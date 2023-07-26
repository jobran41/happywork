const { NEXT_PUBLIC_KEYCLOAK_REALM } = process.env;
const { NEXT_PUBLIC_KEYCLOAK_URL } = process.env;
const { NEXT_PUBLIC_KEYCLOAK_CLIENT_ID } = process.env;
const { NEXT_PUBLIC_BASE_URL } = process.env;
const { NEXT_PUBLIC_BASE_PATH } = process.env;

// eslint-disable-next-line import/no-mutable-exports
let envVarRealm = "";
if (typeof window !== "undefined") {
  const localStorageRealm = localStorage.getItem("realm");
  if (localStorageRealm !== "" && window.location.pathname !== "/") {
    envVarRealm = localStorageRealm as string;
  } else {
    localStorage.setItem("realm", NEXT_PUBLIC_KEYCLOAK_REALM as string);
    envVarRealm = NEXT_PUBLIC_KEYCLOAK_REALM as string;
  }
}

export {
  NEXT_PUBLIC_BASE_URL,
  envVarRealm as NEXT_PUBLIC_KEYCLOAK_REALM,
  NEXT_PUBLIC_KEYCLOAK_URL,
  NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
  NEXT_PUBLIC_BASE_PATH,
};
