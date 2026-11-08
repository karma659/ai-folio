---
layout: page
title: skills
permalink: /skills/
nav: true
nav_order: 2
---

<div class="professional-page">
  <p class="profile-intro">Tools and methods I use across financial software, data engineering, and quantitative research.</p>

  <div class="skills-grid">
    {% for group in site.data.skills %}
    <section class="skill-card" aria-labelledby="skill-{{ forloop.index }}">
      <span class="profile-eyebrow" aria-hidden="true">0{{ forloop.index }}</span>
      <h2 id="skill-{{ forloop.index }}">{{ group.title | escape }}</h2>
      <p class="skill-description">{{ group.description | escape }}</p>
      <ul class="profile-tags" aria-label="{{ group.title | escape }} skills">
        {% for skill in group.items %}
        <li>{{ skill | escape }}</li>
        {% endfor %}
      </ul>
    </section>
    {% endfor %}
  </div>
</div>
