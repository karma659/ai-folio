---
layout: cv
permalink: /pdf/
title: cv
nav: true
nav_order: 5
cv_pdf: Report.pdf # you can also use external links here
description: This is a description of the page. You can modify it in '_pages/cv.md'. You can also change or remove the top pdf download button.
toc:
  sidebar: left
---


<div style="margin-left:auto;margin-right:auto;">
  <object
    data="{{ '/assets/pdf/Report.pdf' | relative_url }}"
    type="application/pdf"
    width="825px"
    height="1175px">
    <embed src="{{ '/assets/pdf/Report.pdf' | relative_url }}">
      <p>
        Your browser doesn’t support embedded PDFs.
        <a href="{{ '/assets/pdf/Report.pdf' | relative_url }}">Download the PDF</a> instead.
      </p>
    </embed>
  </object>
</div>
