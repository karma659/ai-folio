---
layout: page
title: Dynamic Sector Rotation with Machine Learning
description: 

img: assets/img/lgbm.jpeg
importance: 2
category: work
giscus_comments: false
---


## Executive Summary

This report presents the implementation and performance evaluation of a dynamic sector rotation strategy applied to U.S. equity sector data. The strategy dynamically allocates capital across market sectors to maximize risk-adjusted returns, integrating machine learning (LightGBM), dimensionality reduction (PCA), clustering, and risk management techniques to capture persistent sector rotation patterns while maintaining robustness to market regime changes.
The back test covers the period 2014–2019 for in-sample (IS) testing and 2020–2025 for out-of-sample (OOS) validation, using sector ETF returns and the SPY ETF as a benchmark.

## Key performance results

|                        | Annualized Return | Annual Volatility | Sharpe Ratio | Maximum Drawdown |
|------------------------|------------------:|------------------:|-------------:|-----------------:|
| **In-Sample (IS)**     | 8.91%             | 7.96%             | 1.12         | 8.68%            |
| **Out of Sample (OOS)**| 8.76%             | 12.31%            | 0.71         | 19.64%           |
| **OOS-SPY**            | 11.25%            | 10.00%            | 1.12         | 15.40%           |
| **OOS-Pairs Portfolio**| 7.35%             | 10.00%            | 0.74         | 16.11%           |


