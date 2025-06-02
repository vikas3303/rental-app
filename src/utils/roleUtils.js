// utils/roleUtils.js
export const ROLES = {
  ADMIN: 'Admin',
  STAFF: 'Staff',
  CUSTOMER: 'Customer',
};

export function isAdmin(user) {
  return user?.role === ROLES.ADMIN;
}
