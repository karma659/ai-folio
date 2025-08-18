// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/ai-folio/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/ai-folio/projects/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/ai-folio/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/ai-folio/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-dynamic-sector-rotation-with-machine-learning",
          title: 'Dynamic Sector Rotation with Machine Learning',
          description: "The approach uses both supervised and unsupervised learning models to make informed allocation decisions.",
          section: "Projects",handler: () => {
              window.location.href = "/ai-folio/projects/DSRML/";
            },},{id: "projects-",
          title: '',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/ai-folio/projects/Ecom_App/";
            },},{id: "projects-portfolio-optimization-and-efficient-frontier-visualizer",
          title: 'Portfolio Optimization and Efficient Frontier Visualizer',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/ai-folio/projects/portfolio/";
            },},{id: "projects-worldquant-international-quant-championship",
          title: 'WorldQuant International Quant Championship',
          description: "Creating alpha strategies for portfolio construction",
          section: "Projects",handler: () => {
              window.location.href = "/ai-folio/projects/wqiqc/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
