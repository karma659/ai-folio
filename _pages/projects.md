---
layout: default
title: projects
permalink: /projects/
nav: true
nav_order: 3
---
<section class="project-library" aria-labelledby="projects-title">
  <header class="library-heading"><p class="eyebrow">Research / Engineering / Experiments</p><h1 id="projects-title">From hypothesis<br>to <span>working system.</span></h1><p>A collection of quantitative research, trading tools and applied AI projects. Explore the ideas, implementation and results.</p></header>
  <div class="project-toolbar" hidden><div class="project-filters" role="group" aria-label="Filter projects"><button type="button" data-filter="all" aria-pressed="true">All work</button><button type="button" data-filter="research" aria-pressed="false">Quant research</button><button type="button" data-filter="trading" aria-pressed="false">Trading systems</button><button type="button" data-filter="software" aria-pressed="false">AI &amp; software</button></div><p class="project-count" role="status" aria-live="polite">{{ site.projects.size }} projects</p></div>
  <div class="portfolio-grid library-grid">{% assign sorted_projects = site.projects | sort: 'importance' %}{% for project in sorted_projects %}{% include portfolio-card.liquid %}{% endfor %}</div>
</section>
<section class="contact-panel"><div><p class="eyebrow">Have something in mind?</p><h2>Good ideas start with a conversation.</h2></div><a class="portfolio-button primary" href="https://www.linkedin.com/in/karmakarakash659/">Let’s connect <span aria-hidden="true">↗</span></a></section>
