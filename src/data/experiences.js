export const experiences = [
  {
    id: 1,
        title: "Full Stack Development",

        company: "DevIT",

        duration: "8 weeks",

        image:
            import.meta.env.BASE_URL +
            "experience/devit.png",

        about: "Worked as part of the DevIT development team on HippocampOS, contributing to responsive frontend UI/UX while collaborating on backend services and database integration. Gained hands on experience with real world development workflows, version control, debugging and Agile team collaboration.",

        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "UI/UX"
        ],

        credential:
            "https://www.wedevit.in/verify/lucky"
    },
  {
    id: 2,
        title: "AI/ML Internship",

        company: "InternPe",

        duration: "8 weeks",

        image: import.meta.env.BASE_URL + "experience/Internpe.png",

        about:
            "Gained hands on exposure to designing, training and evaluating machine learning models for real world predictive tasks. Worked with supervised learning techniques including classification, regression, Support Vector Machines (SVM) and predictor models while applying data preprocessing and model evaluation practices.",

        skills:[
            "Python",
            "NumPy",
            "Pandas",
          "Scikit-Learn",
            "Machine Learning"
        ],

        credential:"https://internpe.in/verify.html"
  },
];
