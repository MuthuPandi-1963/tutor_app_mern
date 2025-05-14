const getNavbarMenu = (role) => {
  const commonMenu = [
    { id: 1, title: "Home", url: "/" },
  ];
  const lastMenu = [
    { id: 3, title: "Subjects", url: "/subjects" },
    { id: 4, title: "About Us", url: "/about" },
    { id: 5, title: "Contact Us", url: "/contact" },
  ]

  const studentMenu = [
    { id: 6, title: "My Classes", url: "/student/classes" },
    { id: 7, title: "Tutors", url: "/tutors" },
  ];

  const parentMenu = [
    { id: 8, title: "My Children", url: "/parent/children" },
    { id: 9, title: "Activity", url: "/parent/dashboard" },
  ];

  const tutorMenu = [
    { id: 10, title: "Dashboard", url: "/tutor" },
    { id: 11, title: "Bookings", url: "/tutor/bookings" },
  ];

  switch (role) {
    case "student":
      return [...commonMenu, ...studentMenu,...lastMenu];
    case "parent":
      return [...commonMenu, ...parentMenu,...lastMenu];
    case "tutor":
      return [...commonMenu, ...tutorMenu,...lastMenu];
    default:
      return [...commonMenu,...lastMenu];
  }
};
export default getNavbarMenu;