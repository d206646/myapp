export type UserType = {
  name: string;
  id: string | number; // use the actual type you expect
};

export function fetchUserApi(payload: string | number): UserType {
  return {
    name: 'Debarka',
    id: payload,
  };
}