export const getRoleHome = (role?: string | null) => {
  switch (role) {
    case "Admin":
      return "/admin";
    case "Teacher":
      return "/teacher";
    case "Parent":
      return "/parent";
    case "Student":
    default:
      return "/student";
  }
};
