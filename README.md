# Rebmemer

<p align="center">
 <img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/logo-square.png"
      alt="logo" width="200" height="200">
</p>

<p>
  Rebmemer is a mobile-first Progressive Web App designed for spaced repetition practice with a sleek, modern UI. Create question-and-answer flashcards, organize them into decks, and customize how cards are picked for each practice session. Flip the flow with reverse practice mode to review cards from answer to question. Easily import and export your card data via CSV. Simple, flexible, and designed to make spaced repetition a seamless part of your routine — right from your mobile device.
</p>

---

### Learning Configuration

#### Cards Per Practice

The number of cards drawn per practice session can be configured for each deck.

#### New Card Ratio

The maximum percentage of new cards (cards with zero familiarity) that can be included in a practice session.
If the number of available new cards is less than the configured ratio, familiar cards will be used to fill the remaining slots. Likewise, if there are not enough familiar cards available, additional new cards will be included.
This setting only affects sessions where both new and familiar cards exceed their respective required counts.

#### Review Interval Scaling

Cards are selected for practice based on the following urgency formula:

<p align="center">
  <img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/urgency_formula.svg"/>
</p>

A higher **Review Interval Scaling** value causes highly familiar cards to appear less frequently, while a lower value makes them appear more often.

#### Familiarity Leap

Determines how much familiarity increases after a correct answer.

```text
Familiarity += (Max Familiarity - Current Familiarity) × Familiarity Leap / 100
```

This formula is designed so that familiarity grows rapidly at first and then gradually slows as it approaches the maximum familiarity value.

#### Wrong Answer Penalty

Penalty applied when a card is answered incorrectly.

```text
Familiarity *= (100 - Wrong Answer Penalty) / 100
```

Higher penalty values result in a larger reduction in familiarity.

#### Partial Answer Penalty

Penalty applied when a card is marked as partially correct.

```text
Familiarity *= (100 - Partial Answer Penalty) / 100
```

This penalty is typically less severe than the wrong answer penalty.

---

### Screenshots:

<img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/showcase/img_1.webp"
     alt="Decks Index" width="120">
<img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/showcase/img_2.webp"
     alt="Deck" width="120">
<img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/showcase/img_3.webp"
     alt="Search functionality" width="120">
<img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/showcase/img_4.webp"
     alt="Menu" width="120">
<img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/showcase/img_5.webp"
     alt="Deck Creation" width="120">
<img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/showcase/img_6.webp"
     alt="Card Creation" width="120">
<img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/showcase/img_7.webp"
     alt="Card Practice - Text input" width="120">
<img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/showcase/img_8.webp"
     alt="Card Practice - Canva input" width="120">
<img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/showcase/img_9.webp"
     alt="After practice page" width="120">
