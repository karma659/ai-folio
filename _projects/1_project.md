---
layout: page
title: WorldQuant International Quant Championship
description: Creating alpha strategies for portfolio construction
img: assets/img/IQC_logo.webp
importance: 1
category: work
related_publications: true
---


From late April through summer 2025, WorldQuant is running its annual International Quant Championship.

The competition runs on WorldQuant’s 🧠 BRAIN platform, which hosts over 120,000 data types, hundreds of operator functions, and a custom backtesting simulator to test alpha ideas.

I’m happy to share that I placed 14/76,854 in the world (top 0.01%) and 1/2889 (top 0.01%) in the USA during the 1st round. In stage 2, I was among the top 8 teams in US and placed 3rd position. The third round took the best candidates from each region, so unfortunately I did not qualify to advance. Go team USA 🇺🇸!

## Competition rules
At its core, the WorldQuant International Quant Competition revolves around alphas: portfolio construction algorithms that assign weights to stocks in a given universe. Alphas specify how to reweight stocks each day using related data streams as input, like the prior day’s price, news, or company data. The WorldQuant Brain platform does the heavy lifting by simulating an alpha’s corresponding portfolio. Alphas that produce the highest and most stable returns receive high scores.

Alphas are individually scored with a secret formula that weights their Sharpe ratio, turnover, and a custom metric named “fitness.” Fitness is calculated as `sqrt(abs(Returns) / max(turnover,0.125)) * Sharpe`. This rewards alphas with a high Sharpe ratio and high returns with low turnover (a penalty for wildly varying day-to-day weights).

Scores from each submitted alpha are aggregated such that baskets of alphas with strong and uncorrelated returns are highly rewarded. All scores are based on a 5-year backtest ranging from 2018 to 2023.

Each stage in the competition pares down the field to fewer and fewer contestants. The first stage hosted over 76,854 participants. Cutoffs for the second round eliminated all but the top 100 contestants from each country/geograpic region and among the top 8 teams across each country/region , National Finals were conducted. Upcoming is the third round which pits the best contestants from each country/region against one another. The total prize money for the competition is $100k💰 distributed among the top 3 winners in Regional finalist and Global Finalist.

## Generating alphas
WorldQuant generously hosted Q and A sessions with current quant researchers. I got the chance to interact with researchers from India, Singapore and China as they taught about topics from alpha neutralization (unbiasing alphas across different industries or sectors) to vector data fields (which provide more than 1 data point per day).

These webinars were the source of countless alpha ideas and tactics to improve performance. My 📝 webinar notes list out the alphas and tips shared by the researchers, as well as the answers to some of the questions asked by myself and the other participants.

I found WorldQuant’s articles to be fantastic sources of new ideas. 

## A few alphas
Overall, I tested 5,103 alphas and submitted the 130 best for scoring. These involved data fields comprising price, volume, fundamental, and news information on stocks from the USA.

Alphas specify data, functions, and testing parameters. One especially important testing parameter is the neutralization, which allows for group-neutral portfolio construction. For example, market neutralization zeros-out our portfolio such that there is an equal weight of long and short positions across the market. This allows betting not on the overall momentum of the market, but rather the relative movements of stocks within the market. Other group neutralizations like sector, industry, and subindustry neutralization are possible too.

For more information about data, operators, and testing parameters, check out the WorldQuant Brain platform’s excellent 📑 documentation.

Below are a few of my alphas . The graphs show the alpha’s profit over a 5-year backtest from 2018 to 2023


    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images, even citations {% cite einstein1950meaning %}.
Say you wanted to write a bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
