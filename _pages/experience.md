---
layout: page
title: experience
permalink: /experience/
nav: true
nav_order: 1
compact_experience: true
---

<div class="professional-page">
  <p class="profile-intro">Building reliable financial systems, investment research tools, and quantitative strategies.</p>

  <ol class="experience-timeline" aria-label="Professional experience, most recent first">
    {% for position in site.data.experience %}
    <li class="experience-entry">
      <article class="experience-card" aria-labelledby="role-{{ forloop.index }}">
        <div class="experience-heading">
          <div>
            <h2 id="role-{{ forloop.index }}"><a href="{{ position.url | escape }}">{{ position.company | escape }}</a></h2>
            <p class="experience-role">{{ position.role | escape }}</p>
          </div>
          <div class="experience-meta">
            <p class="experience-period">{{ position.period | escape }}</p>
            <p>{{ position.location | escape }}</p>
          </div>
        </div>
        <ul class="experience-highlights">
          {% for highlight in position.highlights %}
          <li>{{ highlight | escape }}</li>
          {% endfor %}
        </ul>
        <ul class="profile-tags" aria-label="Technologies and methods used at {{ position.company | escape }}">
          {% for technology in position.technologies %}
          <li>{{ technology | escape }}</li>
          {% endfor %}
        </ul>
      </article>
    </li>
    {% endfor %}
  </ol>

  <aside class="teaching-note" aria-labelledby="teaching-title">
    <span class="profile-eyebrow">Teaching</span>
    <h2 id="teaching-title">Python at Baruch</h2>
    <p>Graduate Teaching Assistant · Zicklin School of Business</p>
    <p>Helping students build practical Python skills.</p>
  </aside>
</div>
