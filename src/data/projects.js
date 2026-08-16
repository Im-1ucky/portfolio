export const projects = [
  {
    id: 1,

    title: "Attendance Tracker",

    description:
      "A cross platform attendance management application that helps students monitor subject wise attendance, predict future percentages and plan classes to attend or skip through an intuitive dashboard.",

    technologies: [
      "Flutter",
      "Dart",
      "SharedPreferences",
      "Material Design",
    ],

    images: [
      `${import.meta.env.BASE_URL}projects/attendance/1.png`,
      `${import.meta.env.BASE_URL}projects/attendance/2.png`,
      `${import.meta.env.BASE_URL}projects/attendance/3.png`,
      `${import.meta.env.BASE_URL}projects/attendance/4.png`,
      `${import.meta.env.BASE_URL}projects/attendance/5.png`,
    ],

    overview:
      "Attendance Tracker is a cross platform application for managing overall and subject wise attendance. It predicts future attendance requirements, provides an overview of attendance percentages and helps students plan their classes effectively. The application includes 15 day attendance logs, timetable image upload and persistent local storage across both the mobile app and web.",

    features: [
      "Subject-wise attendance management",
      "Overall attendance dashboard",
      "Attendance prediction",
      "Timetable image upload",
      "Persistent local storage",
    ],

    github: "https://github.com/Im-1ucky/Attendance_App_v1/blob/main/README.md",
  },

  {
    id: 2,

    title: "Payment Git History",

    description:
      "An Android application that automatically reads bank transaction notifications and organizes them into a Git inspired financial timeline with interactive visualizations.",

    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Room DB",
      "Notification Parser",
    ],

    images: [
      `${import.meta.env.BASE_URL}projects/payment/1.jpeg`,
      `${import.meta.env.BASE_URL}projects/payment/2.jpeg`,
      `${import.meta.env.BASE_URL}projects/payment/3.jpeg`,
    ],

    overview:
      "Payment Git History automatically matches reads bank transaction notifications and organizes them into a Git inspired financial timeline. It categorizes spending, provides workspace based expense organization, visualizes balance history, tracks loans and offers an interactive dashboard for exploring financial activity.",

    features: [
      "Automatic bank notification parsing",
      "Git inspired transaction timeline",
      "Categorized spending analysis",
      "Balance history visualization",
      "Offline local database",
    ],

    github: "https://github.com/Im-1ucky/TrackIt/blob/main/README.md",
  },

  {
    id: 3,

    title: "Linux Desktop Environment",

    description:
      "A fully customized Arch Linux desktop environment built around Hyprland and Niri with automation, theming and productivity focused workflow enhancements.",

    technologies: [
      "Arch Linux",
      "Hyprland",
      "Wayland",
      "Bash",
      "GTK / Qt",
    ],

    images: [
      `${import.meta.env.BASE_URL}projects/linux/1.png`,
      `${import.meta.env.BASE_URL}projects/linux/2.png`,
      `${import.meta.env.BASE_URL}projects/linux/3.png`,
      `${import.meta.env.BASE_URL}projects/linux/4.png`,
      `${import.meta.env.BASE_URL}projects/linux/5.png`,
      `${import.meta.env.BASE_URL}projects/linux/6.png`,
      `${import.meta.env.BASE_URL}projects/linux/7.png`,
    ],

    overview:
      "Built and maintained a fully customizable Linux desktop environment by configuring Hyprland, Niri, Wayland utilities, desktop themes, shell scripts, startup services and automation tools. The project focuses on improving productivity, system usability and creating a seamless development workflow through deep system customization.",

    features: [
      "Custom Hyprland and Niri configuration",
      "Wayland ecosystem integration",
      "Shell automation scripts",
      "Custom theming",
      "System customization",
    ],

    github: "https://github.com/Im-1ucky/niri-dotfiles/blob/main/README.md",
  },
];
