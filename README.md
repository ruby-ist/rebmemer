# Rebmemer

<p align="center">
 <img src="https://raw.githubusercontent.com/ruby-ist/Rebmemer/refs/heads/main/public/logo-square.png"
      alt="logo" width="200" height="200">
</p>

<p>
  Rebmemer is a mobile-first Progressive Web App designed for spaced repetition practice with a sleek, modern UI. Create question-and-answer flashcards, organize them into decks, and customize how cards are picked for each practice session. Flip the flow with reverse practice mode to review cards from answer to question. Easily import and export your card data via CSV. Simple, flexible, and designed to make spaced repetition a seamless part of your routine — right from your mobile device.
</p>

### Learning Configuration:

#### Cards Per Practice:
Number of cards to draw per practice can be configured deck-wise.

#### New cards Ratio:
Maximum percentage of new cards (cards with zero familiarity) can be drawn per practice. If number of new cards are less than this ratio, familiar cards will be drawn to accomodate the number of cards per session. If number of familiar cards is less than the intended amount, new cards will be drawn to accomodate. This configuration is for the scenario when number of both new cards and familiar cards are exceeding the number of respective cards requried for a practice session.

#### Review Interviewed Scaling:

Cards are drawn for the practice based on the following urgrency formula:

<p align="center">
  <img src="https://latex.codecogs.com/svg.image?\color{white}\Large%20\text{Urgency}=\frac{\text{Current\%20Time}-\text{Last\%20Practiced\%20Time}}{(\text{Review\%20Interval\%20Scaling})^{\text{Familiarity}}}"/>
</p>

Where, **Review Interviewed Scaling** can be adjusted based on your prefernce, if it has lower value, cards with high familiarity will appear more frequent, higher values means cards with high familiarity appear less frequent.


#### Familarity Leap:

How much familiarity can be increased by correct answer.

Familarity += (Max Familiarity - Current Familiarity) * Familarity Leap



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
