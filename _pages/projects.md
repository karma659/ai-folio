---
layout: page
title: projects
permalink: /projects/
description: 
nav: true
nav_order: 3
display_categories: 
horizontal: false
---

<!-- pages/projects.md --> <!-- This version of the projects page implements a masonry layout similar to https://jglazar.github.io/projects/. Each project card is allowed to grow vertically based on its content, and the cards are packed tightly into responsive columns. Masonry.js is used to compute the layout once all images have loaded. The CSS below defines how many columns to use at different breakpoints: one column on small screens, two columns on medium screens, and three columns on large screens. The Liquid loop still iterates over the sorted projects collection and includes the `projects.liquid` partial for each item. --> <div class="projects"> <style> /* Define responsive column widths for masonry items */ .grid-sizer, .grid-item { width: 100%; } @media (min-width: 768px) { .grid-sizer, .grid-item { width: 50%; } } @media (min-width: 1200px) { .grid-sizer, .grid-item { width: 33.333%; } } </style> {% if site.enable_project_categories and page.display_categories %} <!-- Display categorized projects with a masonry grid --> {% for category in page.display_categories %} <a id="{{ category }}" href=".#{{ category }}"> <h2 class="category">{{ category }}</h2> </a> {% assign categorized_projects = site.projects | where: "category", category %} {% assign sorted_projects = categorized_projects | sort: "importance" %} <div class="grid"> <div class="grid-sizer"></div> {% for project in sorted_projects %} <div class="grid-item"> {% include projects.liquid %} </div> {% endfor %} </div> {% endfor %} {% else %} <!-- Display all projects without categories in a masonry grid --> {% assign sorted_projects = site.projects | sort: "importance" %} <div class="grid"> <div class="grid-sizer"></div> {% for project in sorted_projects %} <div class="grid-item"> {% include projects.liquid %} </div> {% endfor %} </div> {% endif %} </div>

{% raw %}

<!-- Load Masonry and imagesLoaded from CDNs and initialise the grid. The raw tags prevent Liquid from interpreting the curly braces inside the script. --> <script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"></script> <script src="https://cdn.jsdelivr.net/npm/imagesloaded@4/imagesloaded.pkgd.min.js"></script> <script> document.addEventListener("DOMContentLoaded", function() { var grid = document.querySelector('.grid'); if (!grid) return; // initialise Masonry once images are loaded var msnry = new Masonry(grid, { itemSelector: '.grid-item', columnWidth: '.grid-sizer', gutter: 10, horizontalOrder: true }); imagesLoaded(grid).on('progress', function() { msnry.layout(); }); }); </script>

{% endraw %}
