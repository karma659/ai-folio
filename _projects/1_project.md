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

(1) Volume-Triggered Volatility Skew 

`trade_when(ts_mean(volume, 270) / ts_mean(volume, 30) < 1, (implied_volatility_call_270 - implied_volatility_put_270), -1)`

* Parameters - USA, TOP3000, market-neutral, Decay 4, Delay 0, Truncation 0.08, Pasteurization On
* Idea - Trade only when recent volume  greater than long-term. If Call IV > Put IV, go long else if Put IV > Call IV, go short.
* Performance - Sharpe: 2.31 | Fitness: 2.66 | Return: 22.86% | Drawdown: 8.00% |Turnover: 17.22% | Margin: 26.56‰
* Notes - Long tenor (270D) keeps the signal stable while shorter tenors were noisier.Smooth climb to >$10M PnL from 2018–2023 with strongest gains during high-volume regimes.

<div class="row">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pnl1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>



(2) Short-Term Volume Surge 

`sqrt(rank(ts_mean(volume,5)/ts_mean(volume,240)))`

* Parameters - USA, TOP3000, subindustry-neutral, Decay 4, Delay 1, Truncation 0.20, Pasteurization On
* Idea - Compare recent volume  to the year average  to spot attention spikes.Go long stocks with a recent volume surge and short those with unusually low recent volume.
* Performance - Sharpe: 1.73 | Fitness: 1.08 | Return: 7.88% | Drawdown: 4.97% |Turnover: 20.34% | Margin: 7.75‰
* Notes - Subindustry neutralization keeps it a stock selection bet, not a sector flow bet and consistent uptrend while pullbacks are shallow and short.

<div class="row">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pnl2.PNG" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>




(3) Short-Term Volume Surge 

`ts_rank(operating_income/cap,250)`

* Parameters - USA, TOP3000, subindustry-neutral, Decay 4, Delay 1, Truncation 0.20, Pasteurization On
* Idea - Compare recent volume  to the year average  to spot attention spikes.Go long stocks with a recent volume surge and short those with unusually low recent volume.
* Performance - Sharpe: 1.73 | Fitness: 1.08 | Return: 7.88% | Drawdown: 4.97% |Turnover: 20.34% | Margin: 7.75‰
* Notes - Subindustry neutralization keeps it a stock-selection bet, not a sector flow bet and 

<div class="row">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pnl3.PNG" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>



