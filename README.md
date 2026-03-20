# RainGuard AI — Predictive Adaptive Income Protection for Kerala Delivery Riders

**Tagline:** *“Predicting rain. Adapting protection. Securing income.”*

## The Problem
Kerala’s Zomato, Swiggy, and Zepto delivery riders frequently lose 25–40% of their weekly earnings during the monsoon season. They either stay online for hours with **zero orders**, or heavy rain and flooding make roads unrideable. Currently, there is no safety net for this unpredictable loss of income caused by external weather disruptions.

## Our Innovative Solution
**RainGuard AI** is a predictive + parametric **weekly** income protection platform.  
It forecasts weather disruptions in advance and provides **Adaptive Income Protection** — dynamically adjusting the compensation amount based on the severity of the disruption while keeping the premium fixed on a weekly basis.

---

## 👥 Persona & Scenarios

**Target Persona:** Food delivery riders working across Zomato, Swiggy, and Zepto in Kerala (focus: Thiruvananthapuram, Kochi, Kozhikode). They earn ₹4,800–6,000 per week and live week-to-week.

**Scenario:** 
A heavy monsoon week hits Kochi. Usually, a rider would lose ₹2,000 this week due to unrideable conditions and zero-order hours. With RainGuard AI, the rider pays a small weekly premium on Monday. When the predicted disruption occurs and triggers the policy conditions, they receive an instant adaptive payout to cover their expected vs. actual earnings gap, securing their livelihood.

---

## 🔄 System Workflow

1. **Onboarding** — Rider enters location, platforms, working hours, and average income.
2. **Data Collection** — Open-Meteo weather forecast + historical order patterns.
3. **AI Risk Prediction** — Predicts weekly risk and potential disruption hours.
4. **Weekly Premium Calculation** — Base ₹89 + dynamic risk component (₹40–₹85), calculated once every Monday for the full week (48-hour lock-in applies).
5. **Policy Activation** — Rider pays the weekly premium.
6. **Predictive Alerts** — Sends advance warnings about high-risk periods.
7. **Real-Time Monitoring** — Tracks weather changes and rider activity.
8. **Disruption Detection** — Identifies Zero-Order Hours and Unrideable Conditions due to rain/flood.
9. **Adaptive Income Protection** — Intelligently adjusts compensation based on disruption severity, staying within the weekly policy limit.
10. **Partial Income Gap Calculation** — Expected earnings – Actual earnings (capped at ₹3,000/week).
11. **Fraud Detection & Validation** — Multi-signal checks including Rider Reliability Score and Contextual Proof of Presence.
12. **Instant Payout** — Approved amount credited instantly to UPI.
13. **Dashboards** — Rider and Admin analytics.

---

## 💵 Weekly Premium Model & Parametric Triggers

### The Weekly Premium Model
The premium is calculated weekly to match the rider's fast-paced, week-to-week earning cycle.  
It consists of a **Base Premium (₹89)** plus a **Dynamic Risk Component (₹40–₹85)**. This is calculated once every Monday for the entire week. A strict **48-hour lock-in period** is enforced to prevent last-minute policy buying when riders see storm clouds forming.

### Parametric + Predictive Triggers
Payouts are triggered automatically when predefined conditions are met:
- **Predicted vs Actual:** Predicted rainfall combined with a >60% drop in orders within a specific H3 hex-grid zone.
- **Real-Time Severe Weather:** Real-time rainfall of ≥15 mm within 3 hours accompanied by a drop in rider activity.
- **Unrideable Conditions:** Hyperlocal flood risks that make roads physically unrideable.

### Platform Choice: Mobile Application
**Justification:** We selected a **Mobile Application** (built with Flutter) over a Web platform because delivery riders spend 100% of their working hours on mobile devices mounted to their bikes. A native mobile application allows us to gather critical sensor data (accelerometer, gyroscope, GPS) in the background. This real-time sensor data is the backbone of our adversarial defense strategy, allowing us to detect phone movement patterns and verify genuine rider activity during high-risk weather.

---

## 🧠 AI/ML Integration

### Premium Calculation & Risk Forecasting
- **XGBoost** is utilized to forecast weekly risk and predict potential disruption hours. By analyzing upcoming Open-Meteo forecasts and historical order patterns, the model dynamically sets the risk component of the weekly premium.

### Fraud Detection & Adversarial Defense
To counter GPS spoofing attacks (like the 500-rider Telegram incident), we use an **Isolation Forest** model to power our **Contextual Proof of Presence** system. It evaluates multi-layered event-triggered signals during high-risk weather:
1. Accelerometer + Gyroscope (riding vibration pattern vs stationary phone)
2. Delivery App Activity & Battery drain
3. Mock Location & Tampering Detection
4. Movement Consistency & Network Signals (WiFi, Bluetooth, cell tower)
5. Rider Reliability Score & Zone Network Validation

If ≥3 signals fail, the claim is flagged high-risk. Honest riders receive a 50% provisional payout immediately, while suspicious claims require a quick 5-second phone shake verification.

---

## ⚙️ Tech Stack & Development Roadmap

### Tech Stack
- **Mobile:** Flutter
- **Backend:** FastAPI
- **Database:** Supabase
- **Weather Data:** Open-Meteo API
- **Machine Learning:** XGBoost, Isolation Forest, scikit-learn
- **Spatial Grid:** Uber H3 library
- **Payments:** Razorpay Test Mode

### 6-Week Development Roadmap
- **Phase 1 (Completed):** Persona research, predictive model logic, Adaptive Income Protection formulation, advanced fraud strategy design, prototype UI, and this foundational Idea Document & 2-min video.
- **Phase 2 (Weeks 3-4):** Full mobile app development, Open-Meteo API integration, core prediction engine build, and weekly premium/payout flow implementation.
- **Phase 3 (Weeks 5-6):** Advanced fraud layer integration, real-time rider & admin dashboards, predictive alerts system, and final testing & deployment deliverables.
